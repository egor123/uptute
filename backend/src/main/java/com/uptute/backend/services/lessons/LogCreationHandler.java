package com.uptute.backend.services.lessons;

import java.util.NoSuchElementException;

import com.uptute.backend.entities.LessonLog;
import com.uptute.backend.enums.lesson.ELogType;
import com.uptute.backend.exceptions.LogAlreadyExists;
import com.uptute.backend.exceptions.LogIsClosedException;
import com.uptute.backend.exceptions.UnsupportedParentLogType;

public interface LogCreationHandler {
    
    LessonLog createLog(Long parentLogId, ELogType type, String userUUID, String details) throws NoSuchElementException, LogIsClosedException, LogAlreadyExists, UnsupportedParentLogType;
}
