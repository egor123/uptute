package com.uptute.backend.account.exceptions;

public class WrongEmailOrPasswordException extends Exception{ //FIXME StatusExceptions for grpc handling
    public WrongEmailOrPasswordException(){
        super("Wrong email or password");
    }
}