package com.uptute.backend.payloads.auth;

import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class TokenRefreshResponse {
    @NonNull
    private String jwt;
    private String tokenType = "Bearer";
    @NonNull
    private String refreshToken;
}
