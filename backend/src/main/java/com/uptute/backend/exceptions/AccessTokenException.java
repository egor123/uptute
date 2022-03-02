package com.uptute.backend.exceptions;

public class AccessTokenException extends Exception {
    public AccessTokenException(){
        super("Access token is not valid");
    }
}