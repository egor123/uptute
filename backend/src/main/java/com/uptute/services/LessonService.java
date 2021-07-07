package com.uptute.services;

import java.util.ArrayList;

import com.uptute.domain.Lesson;

public interface LessonService {
    Lesson getLesson(String id);
    ArrayList<Lesson> getLessons(ArrayList<String> id);
    ArrayList<Lesson> getLessonsByUser(String UUID);
    ArrayList<Lesson> getLessonsByTutor(String UUID);
}
