package com.uptute.backend.payloads.lessons;

import java.util.ArrayList;

import lombok.*;

@Data
public class GetOpenLessonsResponse {
    @NonNull
    private ArrayList<GetLessonDetailsResponse> lessons = new ArrayList<>();
}