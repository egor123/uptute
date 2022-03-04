package com.uptute.backend.payloads.lessons;

import lombok.*;

@Data
@Builder
public class InitializeConferenceRequest {
    @NonNull
    private String zoomLink;
}
