package com.uptute.backend.lesson.services;

import org.springframework.beans.factory.annotation.Autowired;

import com.uptute.backend.lesson.domain.StreamWrapper;

import io.grpc.stub.StreamObserver;

public abstract class ConnectionServiceBase<T, K> {

    @Autowired
    private ConnectionStoreBase<T, K> store;

    public abstract void handleRequest(String uuid, T request);

    public abstract void onConnected(String uuid, StreamWrapper<T, K> wrapper);

    public StreamObserver<T> create(String uuid, StreamObserver<K> observer) {
        var wrapper = new StreamWrapper<T, K>(observer);
        // wrapper.onRequest.subscribe(r -> handleRequest(r));
        store.add(uuid, wrapper);
        onConnected(uuid, wrapper);
        return wrapper.getRequestStream(r -> handleRequest(uuid, r));
    }
}
