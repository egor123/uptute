package com.uptute.backend.payloads.auth;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class TokenRefreshRequest {
    @NotBlank
    private String refreshToken;    
}
