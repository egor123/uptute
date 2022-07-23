package com.uptute.backend.auth.services;

import com.uptute.backend.auth.entities.RefreshToken;
import com.uptute.backend.auth.exceptions.TokenRefreshException;

public interface RefreshTokenService {
    String createRefreshToken(String uuid);

    RefreshToken getByToken(String refreshToken) throws TokenRefreshException;
}