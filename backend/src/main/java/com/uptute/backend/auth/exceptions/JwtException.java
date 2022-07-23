package com.uptute.backend.auth.exceptions;

public class JwtException extends Exception{
    public JwtException(String jwt, String message){
        super(jwt + "; " + message);
    }
}
