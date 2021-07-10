package com.uptute.repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;

import com.github.javafaker.Faker;
import com.uptute.domain.Accaunt;
import com.uptute.domain.Audience;
import com.uptute.domain.TutorDetails;
import com.uptute.domain.UserDetails;
import com.uptute.domain.AccauntDetails;
import com.uptute.enums.Languages;
import com.uptute.enums.Subjects;

public class AccauntRepositoryImpl implements AccauntRepository {

    private <T extends Enum<?>> ArrayList<T> getRandomEnumArray(Class<T> clazz, Random r) {
        var list = new ArrayList<T>(Arrays.asList(clazz.getEnumConstants()));
        for (int i = 0; i < clazz.getEnumConstants().length - 1; i++)
            if (r.nextFloat() > 0.3f)
                list.remove(randomNumber(r, 1, list.size() - 1));
        return list;
    }

    private float randomNumber(Random r, float min, float max) {
        return r.nextFloat() * (max - min) + min;
    }
    private int randomNumber(Random r, int min, int max) {
        return r.nextInt(max - min + 1) + min;
    }

    @Override
    public Accaunt get(String UUID) {
        final int idSize = 10;

        long seed = 0;
        for (char c : UUID.toCharArray())
            seed = 31L*seed + c;
        var random = new Random(seed);
        Faker faker = new Faker(random);

        String firstName = faker.name().firstName();
        String lastName = faker.name().lastName();
        String imgUrl = null;
        LocalDate birthday = LocalDate.now().minusYears(randomNumber(random, 17, 20));
        Integer grade = randomNumber(random, 1, 12);
        AccauntDetails accauntDetails = new AccauntDetails(firstName, lastName, imgUrl, birthday, grade);

        ArrayList<String> uLessonsId = new ArrayList<String>();
        for (int i = 0; i < randomNumber(random, 1, 15); i++)
            uLessonsId.add(faker.lorem().characters(idSize));

        UserDetails userDetails = new UserDetails(uLessonsId);

        ArrayList<String> tLessonsId = new ArrayList<String>();
        for (int i = 0; i < randomNumber(random, 1, 15); i++)
            tLessonsId.add(faker.lorem().characters(idSize));
        String zoomLink = "http://zoom.com";
        float pph = randomNumber(random, 2f, 10f);
        ArrayList<Subjects> subjects = getRandomEnumArray(Subjects.class, random);
        ArrayList<Languages> languages = getRandomEnumArray(Languages.class, random);
        Audience audience = new Audience(randomNumber(random, 1, 12), randomNumber(random, 1, 12));
        String moto = faker.lorem().paragraph(1);
        String about = faker.lorem().paragraph(randomNumber(random, 3, 6));

        TutorDetails tutorDetails = new TutorDetails(tLessonsId, zoomLink, pph, subjects, languages, audience, moto,
                about);

        Accaunt accaunt = new Accaunt(UUID, accauntDetails, userDetails, tutorDetails);
        return accaunt;
    }

    @Override
    public void add(Accaunt user) {
        // TODO Auto-generated method stub

    }

    @Override
    public void update(Accaunt user) {
        // TODO Auto-generated method stub

    }

    @Override
    public void remove(Accaunt user) {
        // TODO Auto-generated method stub

    }

}
