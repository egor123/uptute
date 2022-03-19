package com.uptute.backend.services.lessons;

import java.util.Comparator;
import java.util.Date;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.uptute.backend.entities.Lesson;
import com.uptute.backend.entities.LessonLog;
import com.uptute.backend.enums.lesson.ELessonStatus;
import com.uptute.backend.enums.lesson.ELogType;
import com.uptute.backend.exceptions.LogAlreadyExists;
import com.uptute.backend.exceptions.LogIsClosedException;
import com.uptute.backend.exceptions.UnsupportedParentLogType;
import com.uptute.backend.repositories.LessonLogRepository;
import com.uptute.backend.repositories.LessonRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class LogRepositoryHandlerImpl implements LogRepositoryHandler {

    @Value("${uptute.app.logsExpirationMs.created}")
    private Long createdExpirationTime;

    @Value("${uptute.app.logsExpirationMs.offer}")
    private Long offerExpirationTime;

    @Value("${uptute.app.logsExpirationMs.accepted}")
    private Long acceptedExpirationTime;

    @Value("${uptute.app.logsExpirationMs.init}")
    private Long initExpirationTime;

    @Autowired
    private LogCreationHandler logCreationHandler;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private LessonLogRepository logRepository;

    @Override
    public Lesson getLesson(Long id) throws NoSuchElementException {
        var lesson = lessonRepository.findById(id).get();
        validateLesson(lesson);
        return lesson;
    }

    @Override
    public LessonLog getLog(Long id, Boolean validate) throws NoSuchElementException{
        var log = logRepository.findById(id).get();
        if (validate)
            validateLog(log);
        return log;
    }

    @Override
    public void saveLesson(Lesson lesson) {
        lessonRepository.save(lesson);
    }

    @Override
    public LessonLog saveLog(LessonLog log) {
        return logRepository.save(log);
    }

    @Override
    public Stream<Lesson> getOpenLessons() {
        return lessonRepository.findByStatus(ELessonStatus.OPEN).stream().filter(c -> validateLesson(c));
    }

    private Boolean validateLesson(Lesson lesson) {
        var isValid = validateLog(lesson.getLogs().iterator().next());
        if (!isValid && !lesson.getStatus().equals(ELessonStatus.CLOSED)) {
            lesson.setStatus(ELessonStatus.CLOSED);
            lessonRepository.save(lesson);
        }
        return isValid;
    }

    private Boolean validateLog(LessonLog log) {

        if (!log.getActive())
            return false;
        Long expirationTime = null;
        switch (log.getType()) {
            case CREATED:
                expirationTime = getCreatedExpirationTime(log);
                break;
            case OFFER:
                expirationTime = offerExpirationTime;
                break;
            case ACCEPTED:
                expirationTime = acceptedExpirationTime;
                break;
            case INIT:
                expirationTime = initExpirationTime;
                break;
            case CLOSED:
                return false;
            default:
                throw new UnsupportedOperationException();
        }
        var deltaTime = new Date().getTime() - log.getCreatedAt().getTime();
        var isValid = deltaTime < expirationTime;
        if (!isValid) {
            try {
                logCreationHandler.createLog(log.getId(), ELogType.CLOSED, "", "AUTO_EXPIRED");
            } catch (NoSuchElementException | LogIsClosedException | LogAlreadyExists | UnsupportedParentLogType e) {
                e.printStackTrace();
            }
        }
        return isValid;
    }

    private Long getCreatedExpirationTime(LessonLog log) {
        var logs = log.getLesson()
                .getLogs()
                .stream()
                .sorted(Comparator.comparingLong(LessonLog::getId))
                .collect(Collectors.toList());
        var first = logs.get(0).getCreatedAt().getTime();
        var last = logs.get(logs.size() -1).getCreatedAt().getTime();
        return last - first + createdExpirationTime;
    }
}
