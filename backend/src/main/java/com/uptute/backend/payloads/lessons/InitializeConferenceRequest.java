package com.uptute.backend.payloads.lessons;

import lombok.*;

@Data
@NoArgsConstructor
public class InitializeConferenceRequest {
    @NonNull
    private String zoomLink;
}
