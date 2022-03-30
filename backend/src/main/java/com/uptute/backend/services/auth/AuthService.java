package com.uptute.backend.services.auth;

import com.uptute.backend.exceptions.EmailIsAlreadyTakenException;
import com.uptute.backend.exceptions.TokenRefreshException;
import com.uptute.backend.payloads.auth.JwtResponse;
import com.uptute.backend.payloads.auth.SigninRequest;
import com.uptute.backend.payloads.auth.SignupRequest;
import com.uptute.backend.payloads.auth.TokenRefreshResponse;

public interface AuthService {

    JwtResponse signup(SignupRequest request) throws EmailIsAlreadyTakenException;

    JwtResponse signin(SigninRequest request);

    TokenRefreshResponse refreshToken(String refreshToken) throws TokenRefreshException;
}
