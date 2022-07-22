package com.uptute.backend.payloads.auth;

import java.util.List;

import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class JwtResponse {
    @NonNull
    private String jwt;
    private String tokenType = "Bearer";
    @NonNull
    private String refreshToken;
    @NonNull
    private String UUID;
    @NonNull
    private List<String> roles;
}
