package com.uptute.backend.account.exceptions;

public class UserAlreadyExistsException extends Exception{//FIXME StatusExceptions for grpc handling
    public UserAlreadyExistsException(String email){
        super(email + " is already taken!");
    }
}
