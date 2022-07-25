package com.uptute.backend.lesson.grpc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;

import com.uptute.backend.grpc.lessons.StudentEventRequest;
import com.uptute.backend.grpc.lessons.StudentEventResponse;
import com.uptute.backend.grpc.lessons.TutorEventRequest;
import com.uptute.backend.grpc.lessons.TutorEventResponse;
import com.uptute.backend.grpc.lessons.LessonServiceGrpc.LessonServiceImplBase;
import com.uptute.backend.lesson.services.StudentConnectionServiceImpl;
import com.uptute.backend.lesson.services.TutorConnectionServiceImpl;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;

@GrpcService
public class LessonServiceImpl extends LessonServiceImplBase {
    @Autowired
    private StudentConnectionServiceImpl studentService;
    @Autowired
    private TutorConnectionServiceImpl tutorService;

    @Override
    @PreAuthorize("hasRole('STUDENT')")
    public StreamObserver<StudentEventRequest> subscribeStudentStream(StreamObserver<StudentEventResponse> observer) {
        return studentService.create(SecurityContextHolder.getContext().getAuthentication().getName(), observer);
    }

    @Override
    @PreAuthorize("hasRole('TUTOR')")
    public StreamObserver<TutorEventRequest> subscribeTutorStream(StreamObserver<TutorEventResponse> observer) {
        return tutorService.create(SecurityContextHolder.getContext().getAuthentication().getName(), observer);
    }
}