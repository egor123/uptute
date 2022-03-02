package com.uptute.backend.exceptions;

import com.uptute.backend.entities.LessonLog;

public class LogAlreadyExists extends Exception {
    public LogAlreadyExists(LessonLog log) {
        super("log " + log.getStatus() + " already exists by user: " + log.getCreatedBy());
    }
}