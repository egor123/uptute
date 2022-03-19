package com.uptute.backend.payloads.auth;

import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class SignInRequest {
    @NotBlank
    private String accessToken;
}
