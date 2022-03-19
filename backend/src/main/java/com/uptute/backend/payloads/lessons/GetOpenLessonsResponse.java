package com.uptute.backend.payloads.lessons;

import java.util.List;

import lombok.*;

@Data
public class GetOpenLessonsResponse {
    @NonNull
    private List<GetLessonDetailsResponse> lessons;
}