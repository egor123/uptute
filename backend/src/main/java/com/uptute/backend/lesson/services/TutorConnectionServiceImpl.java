package com.uptute.backend.lesson.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uptute.backend.grpc.lessons.TutorEventRequest;
import com.uptute.backend.grpc.lessons.TutorEventResponse;
import com.uptute.backend.lesson.domain.StreamWrapper;

@Service
public class TutorConnectionServiceImpl extends ConnectionServiceBase<TutorEventRequest, TutorEventResponse> {

    @Autowired
    private LessonRoomService service;

    @Override
    public void onConnected(String uuid, StreamWrapper<TutorEventRequest, TutorEventResponse> wrapper) {
        service.connectTutor(uuid, wrapper);
    }

    @Override
    public void handleRequest(String uuid, TutorEventRequest request) {
        switch (request.getType()) {
            case CONNECT:
                service.get(request.getReciverUUID()).connect(uuid);
                break;
            case DISCONNECT:
                service.get(request.getReciverUUID()).disconnect(uuid);
                break;
            case CONFIG:
                // TODO!!!!!!!!!!!!!!!!
                break;
            default:
                throw new UnsupportedOperationException("Type is not supported");
        }
    }
}
