package com.uptute.backend.exceptions;

public class OfferAlreadyCreated extends Exception {
    public OfferAlreadyCreated(String userUUID, Long lessonId) {
        super("user: " + userUUID + " has already offered to " + lessonId);
    }
}