package com.uptute.backend.auth.services;

import java.util.NoSuchElementException;

import com.uptute.backend.account.entities.User;
import com.uptute.backend.account.exceptions.UserAlreadyExistsException;
import com.uptute.backend.auth.exceptions.TokenRefreshException;
import com.uptute.backend.grpc.account.JwtResponse;
import com.uptute.backend.grpc.auth.ShortJwtResponse;
import com.uptute.backend.grpc.auth.SigninRequest;
import com.uptute.backend.grpc.auth.SignupRequest;

public interface AuthService {

    com.uptute.backend.grpc.auth.JwtResponse signup(SignupRequest request) throws UserAlreadyExistsException;

    JwtResponse signin(SigninRequest request) throws NoSuchElementException;
    
    JwtResponse refreshToken(String refreshToken) throws TokenRefreshException;

    ShortJwtResponse authUser(User user);
}
