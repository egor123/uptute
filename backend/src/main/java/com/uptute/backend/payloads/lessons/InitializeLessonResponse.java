package com.uptute.backend.payloads.lessons;

import lombok.*;

@Data
@AllArgsConstructor
public class InitializeLessonResponse {
    @NonNull
    private Long lessonId;
}
