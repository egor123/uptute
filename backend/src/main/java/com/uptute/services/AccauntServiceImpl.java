package com.uptute.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;

import com.github.javafaker.Faker;
import com.uptute.domain.Accaunt;
import com.uptute.domain.Audience;
import com.uptute.domain.TutorDetails;
import com.uptute.domain.UserDetails;
import com.uptute.enums.Languages;
import com.uptute.enums.Subjects;

public class AccauntServiceImpl implements AccauntService {

    private <T extends Enum<?>> ArrayList<T> getRandomEnumArray(Class<T> clazz) {
        var list = new ArrayList<T>(Arrays.asList(clazz.getEnumConstants()));
        for (int i = 0; i < clazz.getEnumConstants().length - 1; i++)
            if (randomNumber(0, 1) > 0.3f)
                list.remove((int) randomNumber(1, list.size() - 1));
        return list;
    }

    private float randomNumber(float min, float max) {
        return (float) ((Math.random() * (max - min) + min));
    }

    @Override
    public Accaunt getAccaunt(String UUID) {
        Faker faker = new Faker();
        ArrayList<String> uLessonsId = new ArrayList<String>();
        for (int i = 0; i < (int) randomNumber(1, 15); i++)
            uLessonsId.add(faker.idNumber().toString());
        String imgUrl = null;
        LocalDate birthday = LocalDate.now().minusYears((long) (Math.random() * (20 - 14)));
        String name = faker.name().fullName();

        UserDetails userDetails = new UserDetails(uLessonsId, imgUrl, birthday, name);

        ArrayList<String> tLessonsId = new ArrayList<String>();
        for (int i = 0; i < (int) randomNumber(1, 15); i++)
            tLessonsId.add(faker.idNumber().toString());
        String zoomLink = "http://zoom.com";
        float pph = randomNumber(2, 10);
        ArrayList<Subjects> subjects = getRandomEnumArray(Subjects.class);
        ArrayList<Languages> languages = getRandomEnumArray(Languages.class);
        Audience audience = new Audience(Math.round(randomNumber(1, 12)), Math.round(randomNumber(1, 12)));
        String moto = faker.lorem().paragraph(1);
        String about = faker.lorem().paragraph((int) randomNumber(3, 6));

        TutorDetails tutorDetails = new TutorDetails(tLessonsId, zoomLink, pph, subjects, languages, audience, moto,
                about);

        Accaunt accaunt = new Accaunt(UUID, userDetails, tutorDetails);
        return accaunt;
    }
}