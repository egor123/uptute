package com.uptute.backend.services.lessons;

import java.util.NoSuchElementException;

import com.uptute.backend.exceptions.LogIsClosedException;
import com.uptute.backend.exceptions.UnsupportedParentLogType;
import com.uptute.backend.enums.lesson.ELogType;
import com.uptute.backend.exceptions.LogAlreadyExists;
import com.uptute.backend.payloads.lessons.GetLessonLogsResponse;
import com.uptute.backend.payloads.lessons.GetOpenLessonsResponse;
import com.uptute.backend.payloads.lessons.OserveLogResponse;
import com.uptute.backend.payloads.lessons.CreateLogResponse;

public interface LessonService {
    CreateLogResponse createLog(Long parentLogId, ELogType type, String userUUID, Object details)
            throws NoSuchElementException, LogIsClosedException, LogAlreadyExists, UnsupportedParentLogType;

    OserveLogResponse observeLog(Long logId, ELogType type) throws NoSuchElementException, LogIsClosedException;

    GetOpenLessonsResponse getOpenLessons(String userUUID);

    GetLessonLogsResponse getLessonLogs(Long logId) throws NoSuchElementException, LogIsClosedException;
}
