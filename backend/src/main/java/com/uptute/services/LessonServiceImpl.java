package com.uptute.services;

import java.util.ArrayList;

import com.github.javafaker.Faker;
import com.uptute.domain.Lesson;

public class LessonServiceImpl implements LessonService {

    AccauntService accauntService = new AccauntServiceImpl();

    private float randomNumber(float min, float max) {
        return (float) ((Math.random() * (max - min) + min));
    }

    @Override
    public Lesson getLesson(String id) {
        Faker faker = new Faker();
        var userUUID = faker.idNumber().toString();
        var tutorUUID = faker.idNumber().toString();
        var duration = randomNumber(30, 120);
        var invoice = duration / 60 * randomNumber(2, 10);
        var rating = Math.round(randomNumber(2, 5));
        var review = faker.lorem().paragraph((int) randomNumber(1, 5));
        return new Lesson(id, userUUID, tutorUUID, duration, invoice, rating, review);
    }

    @Override
    public ArrayList<Lesson> getLessons(ArrayList<String> id) {
        ArrayList<Lesson> lessons = new ArrayList<>();
        for (var i : id)
            lessons.add(getLesson(i));
        return lessons;
    }

    @Override
    public ArrayList<Lesson> getLessonsByUser(String UUID) {
        return getLessons(accauntService.getAccaunt(UUID).getUserDetails().getLessonsId());
    }

    @Override
    public ArrayList<Lesson> getLessonsByTutor(String UUID) {
        return getLessons(accauntService.getAccaunt(UUID).getTutorDetails().getLessonsId());
    }
}