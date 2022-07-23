package com.uptute.backend.lesson.stores;

import org.springframework.stereotype.Component;

import com.uptute.backend.grpc.lessons.TutorEventRequest;
import com.uptute.backend.grpc.lessons.TutorEventResponse;

@Component
public class TutorConnectionStoreImpl extends ConnectionStoreBase<TutorEventRequest, TutorEventResponse> {
}