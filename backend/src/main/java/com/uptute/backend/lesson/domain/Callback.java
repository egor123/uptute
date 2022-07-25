package com.uptute.backend.lesson.domain;

public interface Callback<T> {
    public void invoke(T arg);
}