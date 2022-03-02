package com.uptute.backend.services.auth;

import com.uptute.backend.exceptions.AuthProviderException;
import com.uptute.backend.exceptions.AccessTokenException;
import com.uptute.backend.exceptions.TokenRefreshException;
import com.uptute.backend.payloads.auth.JwtResponse;
import com.uptute.backend.payloads.auth.TokenRefreshResponse;

public interface AuthService {
    JwtResponse logIn(String accesToken, String provider) throws AuthProviderException, AccessTokenException;

    TokenRefreshResponse refreshToken(String refreshToken) throws TokenRefreshException;
}
