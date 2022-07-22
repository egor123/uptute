package com.uptute.backend.exceptions;

public class JwtException extends Exception{
    public JwtException(String jwt, String message){
        super(jwt + "; " + message);
    }
}
