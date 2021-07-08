package com.uptute.services;

import java.util.ArrayList;

import com.uptute.payloads.TutorCommentResponse;
import com.uptute.payloads.TutorFullInfoResponse;
import com.uptute.payloads.TutorShortInfoResponse;

public interface TutorService {
    TutorShortInfoResponse getShortInfo(String UUID);
    TutorFullInfoResponse getFullInfo(String UUID);
    ArrayList<TutorCommentResponse> getComments(String UUID);
}
