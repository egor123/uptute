package com.uptute.backend.lesson.grpc;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.uptute.backend.lesson.services.LessonRoomService;
import com.uptute.backend.lesson.services.LessonRoomServiceImpl;
import com.uptute.backend.lesson.services.StudentConnectionServiceImpl;
import com.uptute.backend.lesson.services.StudentConnectionStoreImpl;
import com.uptute.backend.lesson.services.TutorConnectionServiceImpl;
import com.uptute.backend.lesson.services.TutorConnectionStoreImpl;

@Configuration
public class LessonServiceTestConfiguration {
    @Bean
    StudentConnectionServiceImpl studentConnectionService() {
        return new StudentConnectionServiceImpl();
    }

    @Bean
    TutorConnectionServiceImpl tutorConnectionService() {
        return new TutorConnectionServiceImpl();
    }

    @Bean
    StudentConnectionStoreImpl studentConnectionStore(){
        return new StudentConnectionStoreImpl();
    }

    @Bean
    TutorConnectionStoreImpl tutorConnectionStore(){
        return new TutorConnectionStoreImpl();
    }

    @Bean
    LessonRoomService lessonRoomService(){
        return new LessonRoomServiceImpl();
    }

    @Bean
    LessonServiceImpl lessonService() {
        return new LessonServiceImpl();
    }
}
