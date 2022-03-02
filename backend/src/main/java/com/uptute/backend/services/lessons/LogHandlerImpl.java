package com.uptute.backend.services.lessons;

import java.util.Date;
import java.util.HashMap;

import com.uptute.backend.entities.Lesson;
import com.uptute.backend.entities.LessonLog;
import com.uptute.backend.enums.lesson.ELogStatus;
import com.uptute.backend.exceptions.LessonIsClosedException;
import com.uptute.backend.exceptions.WrongLessonIdException;

import org.springframework.stereotype.Service;

@Service
public class LogHandlerImpl implements LogHandler {

    @Override
    public Boolean addLog(String lessonId, ELogStatus status, String userUUID, String details)
            throws WrongLessonIdException, LessonIsClosedException {
        return true;
    }

}
