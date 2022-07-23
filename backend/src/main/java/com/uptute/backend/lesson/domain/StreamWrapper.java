package com.uptute.backend.lesson.domain;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;

import io.grpc.stub.StreamObserver;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class StreamWrapper<T, K> { // T: request, K: response //TODO !!!!!!!!!!!!!!!!OBSERVER_CHECK!!!!!!!!!!!!!
    
    // Logger logger = LoggerFactory.getLogger(StreamWrapper.class);
    @NonNull
    private StreamObserver<K> observer; // TODO: BLOODY WRAPPER
    // public Action<T> onRequest = new Action<>(); // to room srv //TODO: JUST DO STH WITH THIS SHIT!!!!!!!!!!!!!!!!!!
    public Action<String> onLessonInit = new Action<>(); // to room srv + fuckin room //TODO FUCK I FORGOT
    public Action<String> onDisconnect = new Action<>(c -> observer.onCompleted()); // to EVRYONE

    public StreamObserver<T> getRequestStream(Callback<T> requestHandler) { // TODO hide somehow or sth???
                                                  // TODO:onNextCALLBACK!!!!!!!!!!!!!!!!!!!!!!!f
        return new StreamObserver<T>() {
            @Override
            public void onNext(T request) {
                // onRequest.invoke(request); // TODO REEEEMMOOVE?????
                requestHandler.invoke(request);
            }

            @Override
            public void onError(Throwable t) { // TODO LOGGING???
                // logger.warn(t.getMessage());
                onDisconnect.invoke(t.getMessage());
            }

            @Override
            public void onCompleted() { // TODO LOGGING???
                onDisconnect.invoke(null); //TODO: remover or change??????????
            }
        };
    }

    public void onNext(K msg) {
        // TODO: INVOKE ON NEXT AND MODIFY THAT SHIIIIIIIIT AGAIN!!!!!!!!! //OR
        // NOTTTTTTTTTTTTTTTTTTTTTTTTTT ENOT) XD
        observer.onNext(msg);
    }

    public void error(Throwable t) {
        onDisconnect.invoke(t.getMessage());
        observer.onError(t);
    }

    public Boolean isActive() {
        return observer != null;
    }
}