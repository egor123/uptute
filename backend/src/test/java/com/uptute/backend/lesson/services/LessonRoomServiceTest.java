package com.uptute.backend.lesson.services;

import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import com.uptute.backend.grpc.lessons.CreatedBody;
import com.uptute.backend.grpc.lessons.StudentEventRequest;
import com.uptute.backend.grpc.lessons.StudentEventResponse;
import com.uptute.backend.lesson.domain.StreamRecorder;
import com.uptute.backend.lesson.grpc.LessonServiceTestConfiguration;

@SpringBootTest
@SpringJUnitConfig(classes = { LessonServiceTestConfiguration.class }) //FIXME do proper config
public class LessonRoomServiceTest {
    @Autowired
    private LessonRoomService service; //TODO mockP

    @Test
    void creationTest() throws Exception{
        var sRec = new StreamRecorder<StudentEventRequest, StudentEventResponse>(UUID.randomUUID().toString());
        
        service.create(sRec.getUuid(), CreatedBody.newBuilder().build());
    }
}