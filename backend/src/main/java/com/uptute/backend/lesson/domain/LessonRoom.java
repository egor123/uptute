package com.uptute.backend.lesson.domain;

import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.uptute.backend.grpc.lessons.ConfigBody;
import com.uptute.backend.grpc.lessons.CreatedBody;
import com.uptute.backend.grpc.lessons.StudentEventResponse;
import com.uptute.backend.grpc.lessons.TutorEventResponse;
import com.uptute.backend.lesson.services.LessonRoomService;
import com.uptute.backend.lesson.services.StudentConnectionStoreImpl;
import com.uptute.backend.lesson.services.TutorConnectionStoreImpl;

import lombok.Data;
import lombok.NonNull;

@Data
public class LessonRoom {

    Logger logger = LoggerFactory.getLogger(LessonRoom.class);

    @NonNull //TODO: autowired????????????????
    private StudentConnectionStoreImpl studentStore;
    @NonNull //TODO: autowired????????????????
    private TutorConnectionStoreImpl tutorStore;
    @NonNull //TODO: autowired????????????????
    private LessonRoomService roomService;

    private State state = State.OPEN;
    @NonNull
    private String student;
    @NonNull
    private CreatedBody details;
    private Set<String> tutors = new HashSet<>();

    public enum State {
        OPEN,
        INITIALIZING,
        IN_PROGRESS,
        CLOSED
    }

    public boolean isOpen() {
        return state.equals(State.OPEN);
    }

    public void connect(String tutor) {
        tutors.add(tutor);
        tutorStore.get(tutor).onDisconnect.subscribe(t -> tutorOnDisconnect(tutor));
        tutorStore.get(tutor).onLessonInit.subscribe(id -> tutorOnLessonInit(tutor, id));
        studentStore.get(student).onNext(StudentEventResponse.newBuilder()
                .setSenderUUID(tutor)
                .setType(com.uptute.backend.grpc.lessons.StudentEventResponse.Type.CONNECTED)
                .build());
    }

    public void disconnect(String tutor) {
        tutors.remove(tutor);
        studentStore.get(student).onNext(StudentEventResponse.newBuilder()
                .setSenderUUID(tutor)
                .setType(com.uptute.backend.grpc.lessons.StudentEventResponse.Type.DISCONNECTED)
                .build());
    }

    public void accept(String tutor) {
        setState(State.INITIALIZING);
        tutorStore.get(tutor).onLessonInit.invoke(student);
        tutorStore.get(tutor).onNext(TutorEventResponse.newBuilder()
                .setSenderUUID(student)
                .setType(com.uptute.backend.grpc.lessons.TutorEventResponse.Type.INITIATED)
                .build());
        studentStore.get(student).onLessonInit.invoke(tutor);
        studentStore.get(student).onNext(StudentEventResponse.newBuilder()
                .setSenderUUID(tutor)
                .setType(com.uptute.backend.grpc.lessons.StudentEventResponse.Type.INITIATED)
                .build());
        tutors = new HashSet<>();
        tutors.add(tutor);
        roomService.initLesson(student, tutor);
    }

    public void reject(String tutor) {
        tutors.remove(tutor);
        tutorStore.get(tutor).onNext(TutorEventResponse.newBuilder()
                .setSenderUUID(student)
                .setType(com.uptute.backend.grpc.lessons.TutorEventResponse.Type.CLOSED)
                .build());
    }

    public void config(String sender, String reciver, ConfigBody details) {
        // TODO!!!!!!!!!!!!
        throw new UnsupportedOperationException("Not implemented");
    }

    private void tutorOnDisconnect(String tutor) {
        if (tutors.contains(tutor))
            disconnect(tutor);
    }

    private void tutorOnLessonInit(String tutor, String id) {
        if (tutors.contains(tutor) && !id.equals(student))
            disconnect(tutor);
    }
}