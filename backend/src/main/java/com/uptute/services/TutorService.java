package com.uptute.services;

import com.uptute.payloads.PageableQueryParams;
import com.uptute.payloads.PageableResponse;
import com.uptute.payloads.TutorCommentResponse;
import com.uptute.payloads.TutorInfoResponse;

public interface TutorService {
    TutorInfoResponse getInfo(String UUID);
    PageableResponse<TutorCommentResponse> getComments(String UUID, PageableQueryParams request);
}
