package com.uptute.backend.services.auth;

import java.util.stream.Collectors;

import com.uptute.backend.entities.Role;
import com.uptute.backend.enums.EProvider;
import com.uptute.backend.enums.ERole;
import com.uptute.backend.exceptions.AuthProviderException;
import com.uptute.backend.exceptions.AccessTokenException;
import com.uptute.backend.exceptions.TokenRefreshException;
import com.uptute.backend.payloads.auth.JwtResponse;
import com.uptute.backend.payloads.auth.TokenRefreshResponse;
import com.uptute.backend.security.jwt.JwtUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private GoogleClientImpl googleClient;

    @Autowired
    private FacebookClientImpl facebookClient;

    @Override
    public JwtResponse logIn(String accessToken, String provider) throws AuthProviderException, AccessTokenException {
        var accaunt = getAuthClient(provider).logIn(accessToken);
        var token = jwtUtils.generateToken(accaunt);
        var refrehToken = refreshTokenService.createRefreshToken(accaunt.getUUID());
        var roles = accaunt.getRoles().stream().map(Role::getName).map(ERole::toString).collect(Collectors.toList());
        return new JwtResponse(token, refrehToken, accaunt.getUUID(), roles);
    }

    private AuthClient getAuthClient(String provider) throws AuthProviderException {
        switch (EProvider.valueOf(provider.toUpperCase())) {
            case GOOGLE:
                return googleClient;
            case FACEBOOK:
                return facebookClient;
            default:
                throw new AuthProviderException(provider);
        }
    }

    @Override
    public TokenRefreshResponse refreshToken(String refreshToken) throws TokenRefreshException {
        var token = refreshTokenService.getByToken(refreshToken);
        refreshTokenService.verifyExpiration(token);
        var accaunt = token.getAccaunt();
        var jwt = jwtUtils.generateToken(accaunt);
        return new TokenRefreshResponse(jwt, refreshToken);
    }
}