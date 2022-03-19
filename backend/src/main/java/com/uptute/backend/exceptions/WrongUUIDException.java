package com.uptute.backend.exceptions;

public class WrongUUIDException extends Exception {
    public WrongUUIDException(String UUID) {
        super("Accaunt with UUID:" + UUID + " doesn't exists");
    }
}
