package com.uptute.services;

import com.uptute.payloads.PageableRequest;
import com.uptute.payloads.PageableResponse;
import com.uptute.payloads.TutorCommentResponse;
import com.uptute.payloads.TutorFullInfoResponse;
import com.uptute.payloads.TutorShortInfoResponse;

public interface TutorService {
    TutorShortInfoResponse getShortInfo(String UUID);
    TutorFullInfoResponse getFullInfo(String UUID);
    PageableResponse<TutorCommentResponse> getComments(String UUID, PageableRequest request);
}
