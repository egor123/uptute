package com.uptute.repository;

import java.util.ArrayList;
import java.util.Random;

import com.github.javafaker.Faker;
import com.uptute.domain.Lesson;

public class LessonRepositoryImpl implements LessonRepository {

    AccauntRepository accauntRepository = new AccauntRepositoryImpl();

    private float randomNumber(Random r, float min, float max) {
        return r.nextFloat() * (max - min) + min;
    }

    private int randomNumber(Random r, int min, int max) {
        return r.nextInt(max - min + 1) + min;
    }

    @Override
    public Lesson get(String id) {
        final int idSize = 10;
        long seed = 0;
        for (char c : id.toCharArray())
            seed = 31L * seed + c;
        var random = new Random(seed);
        Faker faker = new Faker(random);

        var userUUID = faker.lorem().characters(idSize);
        var tutorUUID = faker.lorem().characters(idSize);
        var duration = randomNumber(random, 30f, 120f);
        var invoice = duration / 60 * randomNumber(random, 2f, 10f);
        var rating = randomNumber(random, 2, 5);
        var review = faker.lorem().paragraph(randomNumber(random, 1, 5));
        return new Lesson(id, userUUID, tutorUUID, duration, invoice, rating, review);
    }

    @Override
    public ArrayList<Lesson> get(ArrayList<String> id) {
        ArrayList<Lesson> lessons = new ArrayList<>();
        for (var i : id)
            lessons.add(get(i));
        return lessons;
    }

    @Override
    public ArrayList<Lesson> getByUser(String UUID) {
        return get(accauntRepository.get(UUID).getUserDetails().getLessonsId());
    }

    @Override
    public ArrayList<Lesson> getByTutor(String UUID) {
        return get(accauntRepository.get(UUID).getTutorDetails().getLessonsId());
    }

    @Override
    public void add(Lesson lesson) {
        // TODO Auto-generated method stub

    }

    @Override
    public void update(Lesson lesson) {
        // TODO Auto-generated method stub

    }

    @Override
    public void remove(Lesson lesson) {
        // TODO Auto-generated method stub

    }
}