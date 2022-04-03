package com.uptute.backend.exceptions;

import com.uptute.backend.enums.ERole;

public class UserAlreadyHasRoleException extends Exception {
    public UserAlreadyHasRoleException(String UUID, ERole role) {
        super("User " + UUID + " already has role " + role + "!!!");
    }
}
