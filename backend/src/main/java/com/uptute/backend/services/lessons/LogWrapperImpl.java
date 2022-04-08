package com.uptute.backend.services.lessons;

import java.util.NoSuchElementException;

import com.uptute.backend.entities.LessonLog;
import com.uptute.backend.enums.lesson.ELogType;
import com.uptute.backend.exceptions.AutoExpiredException;
import com.uptute.backend.exceptions.LogAlreadyExists;
import com.uptute.backend.exceptions.LogIsClosedException;
import com.uptute.backend.exceptions.UnsupportedParentLogType;
import com.uptute.backend.services.lessons.logHandlers.AbstractLogHandler;
import com.uptute.backend.services.lessons.logHandlers.AcceptedLogHandler;
import com.uptute.backend.services.lessons.logHandlers.ClosedLogHandler;
import com.uptute.backend.services.lessons.logHandlers.CreatedLogHandler;
import com.uptute.backend.services.lessons.logHandlers.InitLogHandler;
import com.uptute.backend.services.lessons.logHandlers.OfferLogHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class LogWrapperImpl implements LogWrapper {

    @Autowired
    private CreatedLogHandler createdLogHandler;
    @Autowired
    private ClosedLogHandler closedLogHandler;
    @Autowired
    private OfferLogHandler offerLogHandler;
    @Autowired
    private AcceptedLogHandler acceptedLogHandler;
    @Autowired
    private InitLogHandler initLogHandler;

    @Override
    public LessonLog createLog(Long parentLogId, ELogType type, Authentication auth, String details)
            throws NoSuchElementException, LogIsClosedException, LogAlreadyExists, UnsupportedParentLogType, AutoExpiredException {
        var log = getHandler(type).create(parentLogId, details, auth);
        validateLogForExpiration(log);
        return log;
    }

    @Override
    public LessonLog getLog(Long id, ELogType type, Authentication auth)
            throws LogIsClosedException, AutoExpiredException, UnsupportedParentLogType {
        var log = getHandler(type).get(id, auth);
        validateLogForExpiration(log);
        return log;
    }

    @Override
    public void valideteLogForExpiration(LessonLog log) throws AutoExpiredException {
        validateLogForExpiration(log);        
    }

    private AbstractLogHandler getHandler(ELogType type) {
        switch (type) {
            case CREATED:
                return createdLogHandler;
            case CLOSED:
                return closedLogHandler;
            case OFFER:
                return offerLogHandler;
            case ACCEPTED:
                return acceptedLogHandler;
            case INIT:
                return initLogHandler;
            default:
                throw new UnsupportedOperationException();
        }
    }

    private void validateLogForExpiration(LessonLog log) throws AutoExpiredException {
        var parentLog = log.getParentLog();
        if (parentLog != null)
            validateLogForExpiration(parentLog);
        try {
            getHandler(log.getType()).valideteLogForExpiration(log);
        } catch (AutoExpiredException e) {
            try {
                createLog(log.getId(), ELogType.CLOSED, null, "AUTO_EXPIRED");
            } catch (NoSuchElementException | LogIsClosedException | LogAlreadyExists | UnsupportedParentLogType e1) {
                e1.printStackTrace();
            }
            throw e;
        }
    }
}
