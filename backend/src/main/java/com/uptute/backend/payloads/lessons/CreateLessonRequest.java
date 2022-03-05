package com.uptute.backend.payloads.lessons;

import lombok.*;

@Data
@NoArgsConstructor
public class CreateLessonRequest {
    @NonNull
    private String subject;
    @NonNull
    private String details;
}
