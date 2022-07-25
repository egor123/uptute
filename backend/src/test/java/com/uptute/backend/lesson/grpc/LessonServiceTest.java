package com.uptute.backend.lesson.grpc;

import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import com.uptute.backend.grpc.lessons.CreatedBody;
import com.uptute.backend.grpc.lessons.StudentEventRequest;
import com.uptute.backend.grpc.lessons.StudentEventResponse;
import com.uptute.backend.grpc.lessons.TutorEventRequest;
import com.uptute.backend.grpc.lessons.TutorEventResponse;
import com.uptute.backend.lesson.domain.StreamRecorder;

@SpringBootTest
@SpringJUnitConfig(classes = { LessonServiceTestConfiguration.class })
public class LessonServiceTest {

    @Autowired
    private LessonServiceImpl service;

    @Test
    void testOneOnOne() throws Exception {
        var sRec = new StreamRecorder<StudentEventRequest, StudentEventResponse>(UUID.randomUUID().toString());
        sRec.setRequestObserver(service.subscribeStudentStream(sRec.getResponseObserver()));

        var tRec = new StreamRecorder<TutorEventRequest, TutorEventResponse>(UUID.randomUUID().toString());
        tRec.setRequestObserver(service.subscribeTutorStream(tRec.getResponseObserver()));

        sRec.onNext(StudentEventRequest.newBuilder()
                .setType(com.uptute.backend.grpc.lessons.StudentEventRequest.Type.CREATE)
                .setCreated(CreatedBody.newBuilder().setDescription("description").build())
                .setReciverUUID(tRec.getUuid())
                .build());

        tRec.addAssertEquals(TutorEventResponse.newBuilder()
                .setSenderUUID(sRec.getUuid())
                .setType(com.uptute.backend.grpc.lessons.TutorEventResponse.Type.CREATED)
                .setCreated(CreatedBody.newBuilder().setDescription("description").build())
                .build());

        tRec.onNext(TutorEventRequest.newBuilder()
                .setType(com.uptute.backend.grpc.lessons.TutorEventRequest.Type.CONNECT)
                .setReciverUUID(sRec.getUuid())
                .build());

        sRec.addAssertEquals(StudentEventResponse.newBuilder()
                .setSenderUUID(tRec.getUuid())
                .setType(com.uptute.backend.grpc.lessons.StudentEventResponse.Type.CONNECTED)
                .build());

        sRec.onNext(StudentEventRequest.newBuilder()
                .setType(com.uptute.backend.grpc.lessons.StudentEventRequest.Type.ACCEPT)
                .setReciverUUID(tRec.getUuid())
                .build());

        tRec.addAssertEquals(TutorEventResponse.newBuilder()
                .setSenderUUID(sRec.getUuid())
                .setType(com.uptute.backend.grpc.lessons.TutorEventResponse.Type.INITIATED)
                .build());

        sRec.addAssertEquals(StudentEventResponse.newBuilder()
                .setSenderUUID(tRec.getUuid())
                .setType(com.uptute.backend.grpc.lessons.StudentEventResponse.Type.INITIATED)
                .build());
    }
}