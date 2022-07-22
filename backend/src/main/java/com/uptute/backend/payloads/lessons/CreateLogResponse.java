package com.uptute.backend.payloads.lessons;

import lombok.*;

@Data
@AllArgsConstructor
public class CreateLogResponse {
    @NonNull
    private Long lessonId;
    @NonNull
    private Long logId;
}
