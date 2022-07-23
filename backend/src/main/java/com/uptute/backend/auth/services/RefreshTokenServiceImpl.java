package com.uptute.backend.auth.services;

import java.time.Instant;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.uptute.backend.account.repositories.UserRepository;
import com.uptute.backend.auth.entities.RefreshToken;
import com.uptute.backend.auth.exceptions.TokenRefreshException;
import com.uptute.backend.auth.repositories.RefreshTokenRepository;

@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {

    @Value("${uptute.app.jwtRefreshExpirationMs}")
    private Long expirationMs;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public String createRefreshToken(String uuid) {
        return refreshTokenRepository.save(RefreshToken.builder()
                .token(UUID.randomUUID().toString())
                .accaunt(userRepository.findByUUID(uuid).get())
                .expiryDate(Instant.now().plusMillis(expirationMs))
                .build()).getToken();
    }

    @Override
    public RefreshToken getByToken(String refreshToken) throws TokenRefreshException {
        var token = refreshTokenRepository.findByToken(refreshToken)
                .orElseThrow(() -> new TokenRefreshException(refreshToken, "Refresh token is not in database!"));
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getToken(), "Refresh token was expired.");
        }
        return token;
    }
}