package com.uptute.backend.services.lessons;

import java.util.NoSuchElementException;
import java.util.stream.Stream;

import com.uptute.backend.entities.Lesson;
import com.uptute.backend.entities.LessonLog;

public interface LogRepositoryHandler {
    
    Lesson getLesson(Long id);

    LessonLog getLog(Long id, Boolean validate) throws NoSuchElementException;

    void saveLesson(Lesson lesson);
    
    LessonLog saveLog(LessonLog log);

    Stream<Lesson> getOpenLessons();
}
