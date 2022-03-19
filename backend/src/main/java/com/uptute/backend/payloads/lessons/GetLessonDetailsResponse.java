package com.uptute.backend.payloads.lessons;

import lombok.Data;
import lombok.NonNull;

@Data
public class GetLessonDetailsResponse {
    @NonNull
    private Long lessonId;
    @NonNull
    private Long logId;
    @NonNull
    private String details;
}
