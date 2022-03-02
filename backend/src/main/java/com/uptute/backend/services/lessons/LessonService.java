package com.uptute.backend.services.lessons;

import java.util.List;
import java.util.NoSuchElementException;

import com.uptute.backend.entities.Lesson;
import com.uptute.backend.exceptions.LessonIsClosedException;
import com.uptute.backend.payloads.lessons.GetLessonLogsResponse;
import com.uptute.backend.payloads.lessons.InitializeLessonRequest;
import com.uptute.backend.payloads.lessons.InitializeLessonResponse;

public interface LessonService {
    InitializeLessonResponse initializeLesson(InitializeLessonRequest details);

    Boolean abortLesson(Long lessonId) throws NoSuchElementException, LessonIsClosedException;

    GetLessonLogsResponse getLessonLogs(Long lessonId) throws NoSuchElementException;

    List<Lesson> getOpenLessons();
}
