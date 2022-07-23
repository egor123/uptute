package com.uptute.backend.lesson.grpc;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.LinkedList;
import java.util.Queue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import com.uptute.backend.auth.jwt.BearerTokenAuthenticationToken;
import com.uptute.backend.grpc.lessons.CreatedBody;
import com.uptute.backend.grpc.lessons.StudentEventRequest;
import com.uptute.backend.grpc.lessons.StudentEventResponse;
import com.uptute.backend.grpc.lessons.TutorEventRequest;
import com.uptute.backend.grpc.lessons.TutorEventResponse;

import io.grpc.stub.StreamObserver;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@SpringBootTest
@SpringJUnitConfig(classes = { LessonServiceTestConfiguration.class })
public class LessonServiceTest {

    @Autowired
    private LessonServiceImpl lessonService;

    @Test
    void testOneOnOne() throws Exception {
        var sRec = new StreamRecorder<StudentEventRequest, StudentEventResponse>("student");
        sRec.authenticate();
        sRec.setRequestObserver(lessonService.subscribeStudentStream(sRec.getResponseObserver()));

        var tRec = new StreamRecorder<TutorEventRequest, TutorEventResponse>("tutor");
        tRec.authenticate();
        tRec.setRequestObserver(lessonService.subscribeTutorStream(tRec.getResponseObserver()));

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

    @RequiredArgsConstructor
    private class StreamRecorder<T, K> {
        @NonNull
        @Getter
        private String uuid;
        private Queue<K> unprocessedResponses = new LinkedList<>();
        private Queue<Object> unprocessedAsserts = new LinkedList<>();
        @Setter
        private StreamObserver<T> requestObserver;
        @Getter
        private StreamObserver<K> responseObserver = new StreamObserver<K>() {
            @Override
            public void onNext(K response) {
                unprocessedResponses.add(response);
                iterateUnprocessedAsserts();
            }

            @Override
            public void onError(Throwable t) {
            }

            @Override
            public void onCompleted() {
            }
        };

        public void authenticate() {
            SecurityContextHolder.getContext().setAuthentication(new TestToken("token"));
        }

        public StreamRecorder<T, K> onNext(T request) {
            requestObserver.onNext(request);
            return this;
        }

        public StreamRecorder<T, K> addAssertEquals(Object expected) {
            unprocessedAsserts.add(expected);
            iterateUnprocessedAsserts();
            return this;
        }

        private void iterateUnprocessedAsserts() {
            while (!unprocessedAsserts.isEmpty() && !unprocessedResponses.isEmpty()) {
                assertEquals(unprocessedAsserts.poll(), unprocessedResponses.poll());
            }
        }

        private class TestToken extends BearerTokenAuthenticationToken {
            public TestToken(String token) {
                super(token);
            }

            @Override
            public String getName() {
                return uuid;
            }
        }
    }
}