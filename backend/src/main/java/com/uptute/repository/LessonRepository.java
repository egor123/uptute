package com.uptute.repository;

import java.util.ArrayList;

import com.uptute.domain.Lesson;

public interface LessonRepository {
    Lesson get(String id);

    ArrayList<Lesson> get(ArrayList<String> id);

    ArrayList<Lesson> getByUser(String UUID);

    ArrayList<Lesson> getByTutor(String UUID);

    void add(Lesson lesson);

    void update(Lesson lesson);

    void remove(Lesson lesson);
}
