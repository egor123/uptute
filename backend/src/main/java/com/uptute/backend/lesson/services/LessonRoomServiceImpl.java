package com.uptute.backend.lesson.services;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uptute.backend.grpc.lessons.CreatedBody;
import com.uptute.backend.grpc.lessons.StudentEventResponse;
import com.uptute.backend.grpc.lessons.TutorEventRequest;
import com.uptute.backend.grpc.lessons.TutorEventResponse;
import com.uptute.backend.lesson.domain.LessonRoom;
import com.uptute.backend.lesson.domain.StreamWrapper;
import com.uptute.backend.lesson.domain.LessonRoom.State;
import com.uptute.backend.lesson.stores.StudentConnectionStoreImpl;
import com.uptute.backend.lesson.stores.TutorConnectionStoreImpl;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class LessonRoomServiceImpl implements LessonRoomService {

    @Autowired
    private StudentConnectionStoreImpl studentStore;
    @Autowired
    private TutorConnectionStoreImpl tutorStore;

    private Map<String, LessonRoom> lessons = new HashMap<>();
    private Set<String> subscribedTutors = new HashSet<>();

    @Override
    public void create(String student, CreatedBody details) {
        if (lessons.containsKey(student)) {
            studentStore.get(student).onNext(StudentEventResponse.newBuilder()
                    .setType(com.uptute.backend.grpc.lessons.StudentEventResponse.Type.ERROR)
                    .setErrorMessage("room already exists")
                    .build());
        } else {
            lessons.put(student, new LessonRoom(studentStore, tutorStore, this, student, details));
            subscribedTutors.forEach(t -> tutorStore.get(t)
                    .onNext(TutorEventResponse.newBuilder()
                            .setSenderUUID(student)
                            .setType(com.uptute.backend.grpc.lessons.TutorEventResponse.Type.CREATED)
                            .setCreated(details)
                            .build()));
            log.info("student '{}' created room", student);
            log.info("{} tutors notified", subscribedTutors.size());
        }
    }

    @Override
    public void close(String student) {// TODO: just do sth!!!
        lessons.get(student).setState(State.CLOSED); // TODO: weird af
        lessons.remove(student);
        studentStore.get(student).onDisconnect.invoke("lesson is closed"); // TODO: null exc
        subscribedTutors.forEach(t -> tutorStore.get(t)
                .onNext(TutorEventResponse.newBuilder()
                        .setSenderUUID(student)
                        .setType(com.uptute.backend.grpc.lessons.TutorEventResponse.Type.CLOSED)
                        .build()));
    }

    @Override
    public LessonRoom get(String id) { // TODO: change somehow! erros/validation maybe?
        return lessons.get(id);
    }

    @Override
    public void connectTutor(String tutor, StreamWrapper<TutorEventRequest, TutorEventResponse> wrapper) {
        subscribedTutors.add(tutor);
        wrapper.onLessonInit.subscribe(arg -> removeTutor(tutor));
        wrapper.onDisconnect.subscribe(arg -> removeTutor(tutor));
        lessons.values()
                .stream()
                .filter(LessonRoom::isOpen)
                .forEach(l -> wrapper.onNext(TutorEventResponse.newBuilder()
                        .setSenderUUID(l.getStudent())
                        .setType(com.uptute.backend.grpc.lessons.TutorEventResponse.Type.CREATED)
                        .setCreated(l.getDetails())
                        .build()));
    }

    @Override
    public void initLesson(String student, String tutor) {
        removeTutor(tutor);
        subscribedTutors.forEach(t -> tutorStore.get(t)
                .onNext(TutorEventResponse.newBuilder()
                        .setSenderUUID(student)
                        .setType(com.uptute.backend.grpc.lessons.TutorEventResponse.Type.CLOSED)
                        .build()));
    }

    private void removeTutor(String uuid) {
        if (subscribedTutors.contains(uuid))
            subscribedTutors.remove(uuid);
    }
}