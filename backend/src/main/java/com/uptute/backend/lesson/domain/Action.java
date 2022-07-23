package com.uptute.backend.lesson.domain;

import java.util.HashSet;
import java.util.Set;

import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@NoArgsConstructor
@RequiredArgsConstructor
public class Action<T> {
    private Set<Callback<T>> observers = new HashSet<>();
    @NonNull
    private Callback<T> callback;

    
    public void invoke(T arg) { // TODO HIDE OR NOT TO HIDE
        observers.forEach(o -> o.invoke(arg));
        if (callback != null)
            callback.invoke(arg);
    }

    public void subscribe(Callback<T> o) {
        observers.add(o);
    }

    public void unsubscriobe(Callback<T> o) {
        observers.remove(o);
    }
}