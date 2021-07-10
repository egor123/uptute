package com.uptute.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.logging.Logger;

import com.google.inject.Singleton;
import com.uptute.domain.Accaunt;
import com.uptute.domain.Lesson;
import com.uptute.domain.Pageable;
import com.uptute.domain.TutorDetails;
import com.uptute.domain.AccauntDetails;
import com.uptute.payloads.PageableRequest;
import com.uptute.payloads.PageableResponse;
import com.uptute.payloads.TutorCommentResponse;
import com.uptute.payloads.TutorInfoResponse;
import com.uptute.repository.AccauntRepository;
import com.uptute.repository.AccauntRepositoryImpl;
import com.uptute.repository.LessonRepository;
import com.uptute.repository.LessonRepositoryImpl;

@Singleton
public class TutorServiceImpl implements TutorService {

    Logger log = Logger.getLogger(TutorServiceImpl.class.getName());

    AccauntRepository accauntRepository = new AccauntRepositoryImpl();
    LessonRepository lessonRepository = new LessonRepositoryImpl();

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
    public TutorInfoResponse getInfo(String UUID) {
        Accaunt usr = accauntRepository.get(UUID);
        AccauntDetails acDet = usr.getAccauntDetails();
        TutorDetails tutDet = usr.getTutorDetails();
        ArrayList<Lesson> lessons = lessonRepository.getByTutor(UUID);
        int age = LocalDate.now().getYear() - acDet.getBirthday().getYear();

        return new TutorInfoResponse(UUID, acDet.getFirstName(), acDet.getLastName(), acDet.getImgUrl(),
                tutDet.getZoomLink(), tutDet.getSubjects(), tutDet.getLanguages(), tutDet.getAudience(),
                tutDet.getMoto(), tutDet.getAbout(), age, getRating(lessons), tutDet.getPph(), getHours(lessons),
                lessons.size());
    }

    @Override
    public PageableResponse<TutorCommentResponse> getComments(String UUID, PageableRequest request) {
        TutorDetails tutDet = accauntRepository.get(UUID).getTutorDetails();
        Pageable<TutorCommentResponse> pageable = new Pageable<>(request);
        ArrayList<String> lessonsId = pageable.getClampedArray(tutDet.getLessonsId());
        ArrayList<TutorCommentResponse> comments = new ArrayList<>();
        for (var id : lessonsId) {
            Lesson l = lessonRepository.get(id);
            if (l.getRating() != null) {
                var acDet = accauntRepository.get(l.getUserUUID()).getAccauntDetails();
                comments.add(new TutorCommentResponse(l.getId(), l.getUserUUID(), acDet.getFirstName(),
                        acDet.getLastName(), l.getRating(), l.getReview()));
            }
        }
        return pageable.toResponse(comments);
    }
}
