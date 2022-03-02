package com.uptute.backend.services.lessons;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import com.uptute.backend.entities.Lesson;
import com.uptute.backend.entities.LessonLog;
import com.uptute.backend.enums.lesson.ELessonStatus;
import com.uptute.backend.enums.lesson.ELogStatus;
import com.uptute.backend.exceptions.LessonIsClosedException;
import com.uptute.backend.payloads.lessons.GetLessonLogsResponse;
import com.uptute.backend.payloads.lessons.InitializeLessonRequest;
import com.uptute.backend.payloads.lessons.InitializeLessonResponse;
import com.uptute.backend.repositories.LessonRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class LessonServiceImpl implements LessonService {

    @Value("${uptute.app.lessonExpirationTime}")
    private Long lessonExpirationTime;

    @Autowired
    private LessonRepository lessonRepository;

    @Override
    public InitializeLessonResponse initializeLesson(InitializeLessonRequest details) {
        var lesson = new Lesson();
        lesson.addLog(new LessonLog(ELogStatus.CREATED, details.getStudentUUID()));
        lessonRepository.save(lesson);
        return new InitializeLessonResponse(lesson.getId());
    }

    @Override
    public Boolean abortLesson(Long lessonId)
            throws NoSuchElementException, LessonIsClosedException {
        var lesson = lessonRepository.findById(lessonId).get();
        if (!validateLesson(lesson))
            throw new LessonIsClosedException(lessonId);
        lesson.addLog(new LessonLog(ELogStatus.CLOSED, ""));
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
    public List<Lesson> getOpenLessons() {
        return lessonRepository.findByStatus(ELessonStatus.OPEN).stream().filter(c -> validateLesson(c)).collect(Collectors.toList());
    }

    private Boolean validateLesson(Lesson lesson) {
        if (lesson.getStatus().equals(ELessonStatus.CLOSED))
            return false;
        var creationTime = lesson.getLogs().iterator().next().getCreatedAt().getTime();
        var currentTime = new Date().getTime();
        if (currentTime - creationTime > lessonExpirationTime) {
            lesson.addLog(new LessonLog(ELogStatus.AUTO_EXPIRED, ""));
            lesson.setStatus(ELessonStatus.CLOSED);
            lessonRepository.save(lesson);
            return false;
        }
        return true;
    }
}