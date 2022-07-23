package com.uptute.backend.lesson.stores;

import org.springframework.stereotype.Component;

import com.uptute.backend.grpc.lessons.StudentEventRequest;
import com.uptute.backend.grpc.lessons.StudentEventResponse;

@Component
public class StudentConnectionStoreImpl extends ConnectionStoreBase<StudentEventRequest, StudentEventResponse> {
}