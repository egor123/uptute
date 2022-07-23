package com.uptute.backend.lesson.services;

import org.springframework.stereotype.Service;

import com.uptute.backend.grpc.lessons.StudentEventRequest;
import com.uptute.backend.grpc.lessons.StudentEventResponse;

@Service
public class StudentConnectionStoreImpl extends ConnectionStoreBase<StudentEventRequest, StudentEventResponse> {
}