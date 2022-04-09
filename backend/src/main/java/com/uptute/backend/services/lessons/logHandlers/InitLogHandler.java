package com.uptute.backend.services.lessons.logHandlers;

import com.uptute.backend.entities.LessonLog;
import com.uptute.backend.enums.lesson.ELessonStatus;
import com.uptute.backend.enums.lesson.ELogType;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class InitLogHandler extends AbstractLogHandler {
    @Value("${uptute.app.logsExpirationMs.init}")
    private Long expirationTime;
    @Override
    protected ELogType getType() { return ELogType.INIT; }
    @Override
    protected ELogType[] getSupportedParentTypes() { return new ELogType[] { ELogType.ACCEPTED }; }
    @Override
    protected EPermision[] getCreationPermisions() { return new EPermision[] { EPermision.PARENT_LOG_OWNER }; }
    @Override
    protected EPermision[] getReceivingPermisions() { return new EPermision[] { EPermision.LESSON_OWNER, EPermision.LOG_OWNER }; }
    @Override
    protected Long getExpirationTime() { return expirationTime; }
    @Override
    protected void logIsCreated(Authentication auth, LessonLog log) { log.getLesson().setStatus(ELessonStatus.CONFERENCE_IN_PROGRESS); }
}
