package com.uptute.backend.exceptions;

import com.uptute.backend.entities.LessonLog;

public class UnsupportedParentLogType extends Exception {
    public UnsupportedParentLogType(LessonLog parentLog) {
        super("Cannot add log with this type to: " + parentLog.getId());
    }
}
