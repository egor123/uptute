package com.uptute.backend.lesson.services;

import com.uptute.backend.grpc.lessons.CreatedBody;
import com.uptute.backend.grpc.lessons.TutorEventRequest;
import com.uptute.backend.grpc.lessons.TutorEventResponse;
import com.uptute.backend.lesson.domain.LessonRoom;
import com.uptute.backend.lesson.domain.StreamWrapper;

public interface LessonRoomService {

    void create(String uuid, CreatedBody details);

    void close(String uuid);

    LessonRoom get(String studentUuid);

    void connectTutor(String uuid, StreamWrapper<TutorEventRequest, TutorEventResponse> wrapper);

    void initLesson(String student, String tutor);
}
