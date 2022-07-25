package com.uptute.backend.lesson.domain;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.LinkedList;
import java.util.Queue;

import org.springframework.security.core.context.SecurityContextHolder;

import com.uptute.backend.auth.jwt.BearerTokenAuthenticationToken;

import io.grpc.stub.StreamObserver;
import lombok.Getter;
    import lombok.Setter;

public class StreamRecorder<T, K> {
    @Getter
    private String uuid;
    private Queue<K> unprocessedResponses = new LinkedList<>();
    private Queue<Object> unprocessedAsserts = new LinkedList<>();
    @Getter
    private StreamWrapper<T, K> wrapper;
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

    public StreamRecorder(String uuid){
        this.uuid = uuid;
        wrapper = new StreamWrapper<>(responseObserver);
        SecurityContextHolder.getContext().setAuthentication(new TestToken("token"));
    }

    public StreamRecorder<T, K> onNext(T request) {
        authenticate();
        requestObserver.onNext(request);
        return this;
    }

    public StreamRecorder<T, K> addAssertEquals(Object expected) {
        unprocessedAsserts.add(expected);
        iterateUnprocessedAsserts();
        return this;
    }

    private void authenticate() {
        SecurityContextHolder.getContext().setAuthentication(new TestToken("token"));
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