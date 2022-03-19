package com.uptute.backend.exceptions;

import com.uptute.backend.entities.LessonLog;

public class LogIsClosedException extends Exception{
    public LogIsClosedException(LessonLog log) {
        super("Log: '" + log.getId() + "' already has been closed");
    }}
