package com.uptute.backend.services.lessons;

import java.util.ArrayList;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.uptute.backend.entities.LessonLog;
import com.uptute.backend.enums.lesson.ELogType;
import com.uptute.backend.exceptions.LogAlreadyExists;
import com.uptute.backend.exceptions.LogIsClosedException;
import com.uptute.backend.exceptions.UnsupportedParentLogType;
import com.uptute.backend.payloads.lessons.GetLessonDetailsResponse;
import com.uptute.backend.payloads.lessons.GetLessonLogsResponse;
import com.uptute.backend.payloads.lessons.GetOpenLessonsResponse;
import com.uptute.backend.payloads.lessons.OserveLogResponse;
import com.uptute.backend.payloads.lessons.CreateLogResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LessonServiceImpl implements LessonService {

    public final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private LogRepositoryHandler logPullingHandler;

    @Autowired
    private LogCreationHandler logCreationHandler;

    // -----------------------------------------------------------------------

    @Override
    public CreateLogResponse createLog(Long parentLogId, ELogType type, String userUUID, Object details)
            throws NoSuchElementException, LogIsClosedException, LogAlreadyExists, UnsupportedParentLogType {
        var log = logCreationHandler.createLog(parentLogId, type, userUUID, convertToJSON(details));
        return new CreateLogResponse(log.getLesson().getId(), log.getId());
    }

    @Override
    public OserveLogResponse observeLog(Long logId, ELogType type) throws NoSuchElementException, LogIsClosedException {
        var log = logPullingHandler.getLog(logId, true);
        if (!log.getActive())
            throw new LogIsClosedException(log);
        var childLogs = log.getChildLogs()
                .stream()
                .filter(c -> c.getActive() && c.getType().equals(type))
                .collect(Collectors.toList());
        return new OserveLogResponse(log.getLesson().getId(), log.getId(), childLogs);
    }
    // -----------------------------------------------------------------------

    @Override
    public GetLessonLogsResponse getLessonLogs(Long lessonId) throws NoSuchElementException, LogIsClosedException {
        var lesson = logPullingHandler.getLesson(lessonId);
        var logs = new ArrayList<LessonLog>(lesson.getLogs());
        return GetLessonLogsResponse.builder().lessonId(lesson.getId()).logs(logs).build();
    }

    @Override
    public GetOpenLessonsResponse getOpenLessons(String userUUID) {
        return new GetOpenLessonsResponse(logPullingHandler
                .getOpenLessons()
                .filter(c -> {
                    var i = c.getLogs().iterator();
                    while (i.hasNext()) {
                        var log = i.next();
                        if (!log.getActive() && log.getType().equals(ELogType.OFFER)
                                && log.getCreatedBy().equals(userUUID))
                            return false;
                    }
                    return true;
                })
                .map(c -> {
                    var log = c.getLogs().iterator().next();
                    return new GetLessonDetailsResponse(c.getId(), log.getId(), log.getDetails());
                })
                .collect(Collectors.toList()));
    }

    // ---------------------------------------------------------------------------

    private String convertToJSON(Object value) {
        try {
            return objectMapper.writeValueAsString(value);
        } catch (JsonProcessingException e) {
            return "";
        }
    }
}