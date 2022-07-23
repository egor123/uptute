package com.uptute.backend.lesson.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uptute.backend.grpc.lessons.StudentEventRequest;
import com.uptute.backend.grpc.lessons.StudentEventResponse;
import com.uptute.backend.lesson.domain.StreamWrapper;

@Service
public class StudentConnectionServiceImpl extends ConnectionServiceBase<StudentEventRequest, StudentEventResponse> {

    @Autowired
    private LessonRoomService service;

    @Override
    public void onConnected(String uuid, StreamWrapper<StudentEventRequest, StudentEventResponse> wrapper) {
        // service.create(uuid, CreatedBody.newBuilder().build()); //TODO: DELETEME!!!!!!!!!!!!!!!!!!!!1
    }

    @Override
    public void handleRequest(String uuid, StudentEventRequest request) {
        switch (request.getType()) {
            case CREATE:
                service.create(uuid, request.getCreated());
                break;
            case CLOSE:
                service.close(uuid);
                break;
            case ACCEPT:
                service.get(uuid).accept(request.getReciverUUID());
                break;
            case REJECT:
                service.get(uuid).reject(request.getReciverUUID());
                break;
            case CONFIG:
                // TODO!!!!!!!!!!!!!!!!
                break;
            default:
                throw new UnsupportedOperationException("Type is not supported");
        }
    }
}
