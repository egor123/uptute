package com.uptute.services;

import java.util.ArrayList;
import java.util.logging.Logger;

import com.uptute.domain.Accaunt;
import com.uptute.domain.Lesson;
import com.uptute.domain.TutorDetails;
import com.uptute.domain.UserDetails;
import com.uptute.payloads.TutorCommentResponse;
import com.uptute.payloads.TutorFullInfoResponse;
import com.uptute.payloads.TutorShortInfoResponse;

import lombok.var;

public class TutorServiceImpl implements TutorService {

    Logger log = Logger.getLogger(TutorServiceImpl.class.getName());

    AccauntService accauntService = new AccauntServiceImpl();
    LessonService lessonService = new LessonServiceImpl();

    private float getRating(ArrayList<Lesson> lessons) {
        float total = 0;
        int n = 0;
        for (Lesson lesson : lessons) {
            if (lesson.getRating() != 0) {
                total += lesson.getRating();
                n++;
            }
        }
        return total / n;
    }

    private float getHours(ArrayList<Lesson> lessons) {
        float total = 0;
        for (Lesson lesson : lessons)
            total += lesson.getDuration();
        return total;
    }

    @Override
    public TutorShortInfoResponse getShortInfo(String UUID) {
        Accaunt usr = accauntService.getAccaunt(UUID);
        UserDetails usrDet = usr.getUserDetails();
        TutorDetails tutDet = usr.getTutorDetails();
        ArrayList<Lesson> lessons = lessonService.getLessonsByTutor(UUID);

        return new TutorShortInfoResponse(usr.getUUID(), usrDet.getName(), usrDet.getImgUrl(), tutDet.getZoomLink(),
                getRating(lessons), tutDet.getPph(), getHours(lessons), lessons.size());
    }

    @Override
    public TutorFullInfoResponse getFullInfo(String UUID) {
        Accaunt usr = accauntService.getAccaunt(UUID);
        UserDetails usrDet = usr.getUserDetails();
        TutorDetails tutDet = usr.getTutorDetails();
        ArrayList<Lesson> lessons = lessonService.getLessonsByTutor(UUID);

        return new TutorFullInfoResponse(UUID, usrDet.getName(), usrDet.getImgUrl(), tutDet.getZoomLink(),
                tutDet.getSubjects(), tutDet.getLanguages(), tutDet.getMoto(), tutDet.getAbout(), getRating(lessons),
                tutDet.getPph(), getHours(lessons), lessons.size());
    }

    @Override
    public ArrayList<TutorCommentResponse> getComments(String UUID) {
        ArrayList<Lesson> lessons = lessonService.getLessonsByTutor(UUID);
        ArrayList<TutorCommentResponse> comments = new ArrayList<>();
        for (var l : lessons)
            if (l.getRating() != 0)
                comments.add(new TutorCommentResponse(l.getId(), l.getUserUUID(),
                        accauntService.getAccaunt(l.getUserUUID()).getUserDetails().getName(), l.getRating(),
                        l.getReview()));
        return comments;
    }
}
