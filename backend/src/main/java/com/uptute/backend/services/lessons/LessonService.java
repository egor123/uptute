package com.uptute.backend.services.lessons;

import java.util.NoSuchElementException;

import com.uptute.backend.exceptions.LessonIsClosedException;
import com.uptute.backend.exceptions.OfferAlreadyCreated;
import com.uptute.backend.payloads.lessons.GetLessonLogsResponse;
import com.uptute.backend.payloads.lessons.GetOffersResponse;
import com.uptute.backend.payloads.lessons.GetOpenLessonsResponse;
import com.uptute.backend.payloads.lessons.InitializeLessonRequest;
import com.uptute.backend.payloads.lessons.InitializeLessonResponse;

public interface LessonService {
    InitializeLessonResponse initializeLesson(String userUUID, InitializeLessonRequest details);

    Boolean abortLesson(String userUUID, Long lessonId) throws NoSuchElementException, LessonIsClosedException;

    GetLessonLogsResponse getLessonLogs(Long lessonId) throws NoSuchElementException;

    GetOpenLessonsResponse getOpenLessons();

    Boolean createOffer(String userUUID, Long lessonId)
            throws OfferAlreadyCreated, NoSuchElementException, LessonIsClosedException;

    GetOffersResponse getOffers(Long lessonId) throws NoSuchElementException, LessonIsClosedException;
}
