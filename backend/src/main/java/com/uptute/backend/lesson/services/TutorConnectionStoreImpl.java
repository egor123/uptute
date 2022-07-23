package com.uptute.backend.lesson.services;

import org.springframework.stereotype.Service;

import com.uptute.backend.grpc.lessons.TutorEventRequest;
import com.uptute.backend.grpc.lessons.TutorEventResponse;

@Service
public class TutorConnectionStoreImpl extends ConnectionStoreBase<TutorEventRequest, TutorEventResponse> {
}