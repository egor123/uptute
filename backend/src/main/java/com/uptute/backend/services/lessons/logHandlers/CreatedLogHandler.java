package com.uptute.backend.services.lessons.logHandlers;

import com.uptute.backend.entities.LessonLog;
import com.uptute.backend.enums.lesson.ELogType;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CreatedLogHandler extends AbstractLogHandler {
    @Value("${uptute.app.logsExpirationMs.created}")
    private Long expirationTime;
    @Override
    protected ELogType getType() { return ELogType.CREATED; }
    @Override
    protected ELogType[] getSupportedParentTypes() { return null; }
    @Override
    protected EPermision[] getCreationPermisions() { return null; }
    @Override
    protected EPermision[] getReceivingPermisions() { return new EPermision[] { EPermision.LOG_OWNER }; }
    @Override
    protected Long getExpirationTime() { return expirationTime; }
    @Override
    protected void logIsCreated(LessonLog log) {}
}