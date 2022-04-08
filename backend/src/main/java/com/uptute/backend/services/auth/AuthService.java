package com.uptute.backend.services.auth;

import java.util.NoSuchElementException;

import com.uptute.backend.exceptions.EmailIsAlreadyTakenException;
import com.uptute.backend.exceptions.TokenRefreshException;
import com.uptute.backend.payloads.auth.JwtResponse;
import com.uptute.backend.payloads.auth.SigninRequest;
import com.uptute.backend.payloads.auth.SignupRequest;
import com.uptute.backend.payloads.auth.TokenRefreshResponse;

import org.springframework.security.core.AuthenticationException;

public interface AuthService {

    JwtResponse signup(SignupRequest request) throws EmailIsAlreadyTakenException;

    JwtResponse signin(SigninRequest request) throws NoSuchElementException, AuthenticationException;

    TokenRefreshResponse refreshToken(String refreshToken) throws TokenRefreshException;
}
