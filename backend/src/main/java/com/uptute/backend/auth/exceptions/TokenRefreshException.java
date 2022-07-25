package com.uptute.backend.auth.exceptions;

public class TokenRefreshException extends Exception {
    public TokenRefreshException(String refreshToken, String message) {
        super(refreshToken + "; " + message);
    }
}
