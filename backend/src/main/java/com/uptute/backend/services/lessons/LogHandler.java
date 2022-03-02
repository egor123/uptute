package com.uptute.backend.services.lessons;

import com.uptute.backend.enums.lesson.ELogStatus;
import com.uptute.backend.exceptions.LessonIsClosedException;
import com.uptute.backend.exceptions.WrongLessonIdException;

public interface LogHandler {
    Boolean addLog(String lessonId, ELogStatus status, String userUUID, String details)
            throws WrongLessonIdException, LessonIsClosedException;
}
