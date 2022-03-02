package com.uptute.backend.services.lessons;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.uptute.backend.entities.Lesson;
import com.uptute.backend.entities.LessonLog;
import com.uptute.backend.enums.lesson.ELessonStatus;
import com.uptute.backend.enums.lesson.ELogStatus;
import com.uptute.backend.exceptions.LessonIsClosedException;
import com.uptute.backend.exceptions.OfferAlreadyCreated;
import com.uptute.backend.payloads.lessons.GetLessonDetailsResponse;
import com.uptute.backend.payloads.lessons.GetLessonLogsResponse;
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
        var lesson = lessonRepository.findById(lessonId).get();
        if (!validateLesson(lesson))
            throw new LessonIsClosedException(lessonId);
        lesson.addLog(new LessonLog(ELogStatus.CLOSED, userUUID, ""));
        lesson.setStatus(ELessonStatus.CLOSED);
        lessonRepository.save(lesson);
        return true;
    }

    @Override
    public GetLessonLogsResponse getLessonLogs(Long lessonId) throws NoSuchElementException {
        var lesson = lessonRepository.findById(lessonId).get();
        validateLesson(lesson);
        var logs = new ArrayList<LessonLog>(lesson.getLogs());
        return GetLessonLogsResponse.builder().lessonId(lessonId).logs(logs).build();
    }

    @Override
    public GetOpenLessonsResponse getOpenLessons() {
        var response = new GetOpenLessonsResponse();
        lessonRepository.findByStatus(ELessonStatus.OPEN)
                .stream()
                .filter(c -> validateLesson(c))
                .forEach(c -> response.getLessons()
                        .add(new GetLessonDetailsResponse(c.getId(), c.getLogs().iterator().next().getDetails())));
        return response;
    }

    @Override
    public Boolean createOffer(String userUUID, Long lessonId) throws OfferAlreadyCreated, NoSuchElementException, LessonIsClosedException {
        var lesson = lessonRepository.findById(lessonId).get();
        if (!validateLesson(lesson))
            throw new LessonIsClosedException(lessonId);
        if (lesson.getLogs().stream().filter(c -> c.getStatus().equals(ELogStatus.OFFER) && c.getCreatedBy().equals(userUUID))
                .count() > 0)
            throw new OfferAlreadyCreated(userUUID, lessonId);
        lesson.addLog(new LessonLog(ELogStatus.OFFER, userUUID, ""));
        lessonRepository.save(lesson);
        return true;
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