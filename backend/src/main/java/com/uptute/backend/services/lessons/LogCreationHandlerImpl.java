package com.uptute.backend.services.lessons;

import java.util.Arrays;
import java.util.NoSuchElementException;

import com.uptute.backend.entities.Lesson;
import com.uptute.backend.entities.LessonLog;
import com.uptute.backend.enums.lesson.ELessonStatus;
import com.uptute.backend.enums.lesson.ELogType;
import com.uptute.backend.exceptions.LogAlreadyExists;
import com.uptute.backend.exceptions.LogIsClosedException;
import com.uptute.backend.exceptions.UnsupportedParentLogType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LogCreationHandlerImpl implements LogCreationHandler {

    @Autowired
    private LogRepositoryHandlerImpl logRepositoryHandler;

    @Override
    public LessonLog createLog(Long parentLogId, ELogType type, String userUUID, String details)
            throws NoSuchElementException, LogIsClosedException, LogAlreadyExists, UnsupportedParentLogType {
        var log = new LessonLog(type, userUUID, details);
        switch (type) {
            case CREATED:
                return handleCreatedLog(log);
            case CLOSED:
                return handleClosedLog(log, parentLogId);
            case OFFER:
                return handleOfferLog(log, parentLogId);
            case ACCEPTED:
                return handleAcceptedLog(log, parentLogId);
            case INIT:
                return handleInitLog(log, parentLogId);
            default:
                throw new UnsupportedOperationException();
        }
    }

    // ---------------------------------------------------------------

    private LessonLog handleCreatedLog(LessonLog log) {
        var lesson = new Lesson();
        addToLesson(log, lesson);
        logRepositoryHandler.saveLesson(lesson);
        return log;
    }

    private LessonLog handleClosedLog(LessonLog log, Long parentLogId)
            throws NoSuchElementException, LogIsClosedException {
        var parentLog = logRepositoryHandler.getLog(parentLogId, false);
        addToParentLog(log, parentLog);
        disableLog(parentLog);
        addToLesson(log, parentLog.getLesson());
        return logRepositoryHandler.saveLog(log);
    }

    private LessonLog handleOfferLog(LessonLog log, Long parentLogId)
            throws NoSuchElementException, LogAlreadyExists, LogIsClosedException, UnsupportedParentLogType {
        var parentLog = logRepositoryHandler.getLog(parentLogId, true);
        validateForSupportedParentType(parentLog, new ELogType[] { ELogType.CREATED });
        validateForDuplicates(parentLog, log);
        addToParentLog(log, parentLog);
        addToLesson(log, parentLog.getLesson());
        return logRepositoryHandler.saveLog(log);
    }

    private LessonLog handleAcceptedLog(LessonLog log, Long parentLogId)
            throws NoSuchElementException, LogAlreadyExists, LogIsClosedException, UnsupportedParentLogType {
        var parentLog = logRepositoryHandler.getLog(parentLogId, true);
        validateForSupportedParentType(parentLog, new ELogType[] { ELogType.OFFER });
        validateForDuplicates(parentLog, log);
        addToParentLog(log, parentLog);
        addToLesson(log, parentLog.getLesson());
        return logRepositoryHandler.saveLog(log);
    }

    private LessonLog handleInitLog(LessonLog log, Long parentLogId)
            throws NoSuchElementException, LogAlreadyExists, LogIsClosedException, UnsupportedParentLogType {
        var parentLog = logRepositoryHandler.getLog(parentLogId, true);
        validateForSupportedParentType(parentLog, new ELogType[] { ELogType.ACCEPTED });
        validateForDuplicates(parentLog, log);
        addToParentLog(log, parentLog);
        addToLesson(log, parentLog.getLesson());
        log.getLesson().setStatus(ELessonStatus.CONFERENCE_IN_PROGRESS);
        return logRepositoryHandler.saveLog(log);
    }
    // ---------------------------------------------------------------

    public void validateForDuplicates(LessonLog parentLog, LessonLog log) throws LogAlreadyExists {
        for (var l : parentLog.getChildLogs()) {
            if (l.getType().equals(log.getType()) && l.getCreatedBy().equals(log.getCreatedBy()))
                throw new LogAlreadyExists(log);
        }
    }

    private void validateForSupportedParentType(LessonLog parentLog, ELogType[] supportedTypes)
            throws UnsupportedParentLogType {
        if (!Arrays.stream(supportedTypes).anyMatch(parentLog.getType()::equals))
            throw new UnsupportedParentLogType(parentLog);
    }

    private void addToParentLog(LessonLog log, LessonLog parentLog) throws LogIsClosedException {
        if (!parentLog.getActive())
            throw new LogIsClosedException(parentLog);
        log.setParentLog(parentLog);
        parentLog.getChildLogs().add(log);
    }

    private void disableLog(LessonLog log) {
        log.setActive(false);
        log.getChildLogs().forEach(c -> disableLog(c));
    }

    private void addToLesson(LessonLog log, Lesson lesson) {
        lesson.getLogs().add(log);
        log.setLesson(lesson);
    }
}