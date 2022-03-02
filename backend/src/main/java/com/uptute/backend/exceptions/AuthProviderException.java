package com.uptute.backend.exceptions;

public class AuthProviderException extends Exception{
    public AuthProviderException(String provider) {
        super("Provider '" + provider + "' is unknown");
    }}
