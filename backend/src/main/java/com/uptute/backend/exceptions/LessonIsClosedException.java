package com.uptute.backend.exceptions;

public class LessonIsClosedException extends Exception{
    public LessonIsClosedException(Long lessonId) {
        super("Lesson: '" + lessonId + "' already has been closed");
    }}
