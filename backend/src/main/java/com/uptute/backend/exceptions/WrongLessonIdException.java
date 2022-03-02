package com.uptute.backend.exceptions;

public class WrongLessonIdException extends Exception {
    public WrongLessonIdException(Long lessonId) {
        super("lesson id:" + lessonId + " does not exists");
    }
}
