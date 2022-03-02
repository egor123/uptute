package com.uptute.backend.payloads.lessons;

import lombok.Data;
import lombok.NonNull;

@Data
public class RejectOfferRequest {
    @NonNull
    private String tutorUUID;
}
