package com.uptute.backend.services.lessons;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.uptute.backend.entities.Lesson;
import com.uptute.backend.entities.LessonLog;
import com.uptute.backend.enums.lesson.ELessonStatus;
import com.uptute.backend.enums.lesson.ELogStatus;
import com.uptute.backend.exceptions.LessonIsClosedException;
import com.uptute.backend.exceptions.LogAlreadyExists;
import com.uptute.backend.payloads.lessons.GetLessonDetailsResponse;
import com.uptute.backend.payloads.lessons.GetLessonLogsResponse;
import com.uptute.backend.payloads.lessons.GetOffersResponse;
import com.uptute.backend.payloads.lessons.GetOpenLessonsResponse;
import com.uptute.backend.payloads.lessons.InitializeLessonRequest;
import com.uptute.backend.payloads.lessons.InitializeLessonResponse;
import com.uptute.backend.repositories.LessonRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class LessonServiceImpl implements LessonService {

    public final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${uptute.app.lessonExpirationTime}")
    private Long lessonExpirationTime;

    @Autowired
    private LessonRepository lessonRepository;

    @Override
    public InitializeLessonResponse initializeLesson(String userUUID, InitializeLessonRequest details) {
        var lesson = new Lesson();
        lesson.addLog(new LessonLog(ELogStatus.CREATED, userUUID, convertToJSON(details)));
        lessonRepository.save(lesson);
        return new InitializeLessonResponse(lesson.getId());
    }

    @Override
    public Boolean abortLesson(String userUUID, Long lessonId)
            throws NoSuchElementException, LessonIsClosedException {
        var lesson = getValidatedLesson(lessonId, true);
        lesson.addLog(new LessonLog(ELogStatus.CLOSED, userUUID, ""));
        lesson.setStatus(ELessonStatus.CLOSED);
        lessonRepository.save(lesson);
        return true;
    }

    @Override
    public GetLessonLogsResponse getLessonLogs(Long lessonId) throws NoSuchElementException, LessonIsClosedException {
        var lesson = getValidatedLesson(lessonId, false);
        var logs = new ArrayList<LessonLog>(lesson.getLogs());
        return GetLessonLogsResponse.builder().lessonId(lessonId).logs(logs).build();
    }

    @Override
    public GetOpenLessonsResponse getOpenLessons() {
        return new GetOpenLessonsResponse(lessonRepository
                .findByStatus(ELessonStatus.OPEN)
                .stream()
                .filter(c -> validateLesson(c))
                .map(c -> new GetLessonDetailsResponse(c.getId(), c.getLogs().iterator().next().getDetails()))
                .collect(Collectors.toList()));
    }

    @Override
    public Boolean createOffer(String userUUID, Long lessonId)
            throws NoSuchElementException, LessonIsClosedException, LogAlreadyExists {
        var lesson = getValidatedLesson(lessonId, true);
        var log = new LessonLog(ELogStatus.OFFER, userUUID, "");
        validateForDublicates(lesson, log);
        lesson.addLog(log);
        lessonRepository.save(lesson);
        return true;
    }

    @Override
    public GetOffersResponse getOffers(Long lessonId) throws NoSuchElementException, LessonIsClosedException {
        var lesson = getValidatedLesson(lessonId, true);
        var tutors = getReducedOfferLogs(lesson).map(c -> c.getCreatedBy()).collect(Collectors.toList());
        return new GetOffersResponse(tutors);
    }

    @Override
    public Boolean cancelOffer(Long lessonId, String userUUID)
            throws LessonIsClosedException, NoSuchElementException {
        var lesson = getValidatedLesson(lessonId, true);
        var offerLog = getReducedOfferLogs(lesson).filter(c -> c.getCreatedBy().equals(userUUID)).findFirst().get();
        lesson.addLog(new LessonLog(ELogStatus.CANCELED, userUUID, String.valueOf(offerLog.getId())));
        lessonRepository.save(lesson);
        return true;
    }

    @Override
    public Boolean rejectOffer(Long lessonId, String userUUID, String tutorUUID)
            throws LessonIsClosedException, NoSuchElementException {
        var lesson = getValidatedLesson(lessonId, true);
        var offerLog = getReducedOfferLogs(lesson).filter(c -> c.getCreatedBy().equals(userUUID)).findFirst().get();
        lesson.addLog(new LessonLog(ELogStatus.REJECTED, userUUID, String.valueOf(offerLog.getId())));
        lessonRepository.save(lesson);
        return null;
    }

    // ---------------------------------------------------------------------------

    private Boolean validateForDublicates(Lesson lesson, LessonLog log) throws LogAlreadyExists {
        if (lesson
                .getLogs()
                .stream()
                .filter(c -> c.getStatus().equals(log.getStatus())
                        && c.getCreatedBy().equals(log.getCreatedBy())
                        && c.getDetails().equals(log.getDetails()))
                .count() == 0)
            return true;
        throw new LogAlreadyExists(log);
    }

    private Stream<LessonLog> getReducedOfferLogs(Lesson lesson) {
        Map<Long, LessonLog> reducedLogs = new HashMap<>();
        lesson.getLogs().stream().forEach(c -> {
            if (c.getStatus().equals(ELogStatus.OFFER))
                reducedLogs.put(c.getId(), c);
            else if (c.getStatus().equals(ELogStatus.OFFER) || c.getStatus().equals(ELogStatus.CANCELED))
                reducedLogs.remove(Long.valueOf(c.getDetails()));
        });
        return reducedLogs.values().stream();
    }

    private Lesson getValidatedLesson(Long id, Boolean throwError)
            throws LessonIsClosedException, NoSuchElementException {
        var lesson = lessonRepository.getById(id);
        if (!validateLesson(lesson) && throwError)
            throw new LessonIsClosedException(id);
        return lesson;
    }

    private Boolean validateLesson(Lesson lesson) {
        if (lesson.getStatus().equals(ELessonStatus.CLOSED))
            return false;
        var creationTime = lesson.getLogs().iterator().next().getCreatedAt().getTime();
        var currentTime = new Date().getTime();
        if (currentTime - creationTime > lessonExpirationTime) {
            lesson.addLog(new LessonLog(ELogStatus.AUTO_EXPIRED, "", ""));
            lesson.setStatus(ELessonStatus.CLOSED);
            lessonRepository.save(lesson);
            return false;
        }
        return true;
    }

    private String convertToJSON(Object value) {
        try {
            return objectMapper.writeValueAsString(value);
        } catch (JsonProcessingException e) {
            return "";
        }
    }
}