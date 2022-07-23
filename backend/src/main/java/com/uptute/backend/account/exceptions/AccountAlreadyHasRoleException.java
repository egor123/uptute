package com.uptute.backend.account.exceptions;

import com.uptute.backend.account.enums.ERole;

public class AccountAlreadyHasRoleException extends Exception {
    public AccountAlreadyHasRoleException(String UUID, ERole role) {
        super("User " + UUID + " already has role " + role + "!!!");
    }
}
