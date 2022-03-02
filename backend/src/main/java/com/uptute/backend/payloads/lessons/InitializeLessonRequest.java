package com.uptute.backend.payloads.lessons;

import lombok.*;

@Data
@Builder
public class InitializeLessonRequest {
    @NonNull
    private String studentUUID;
    @NonNull
    private String subject;
    @NonNull
    private String details;
}
