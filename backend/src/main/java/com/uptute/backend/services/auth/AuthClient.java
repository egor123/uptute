package com.uptute.backend.services.auth;

import com.uptute.backend.entities.Account;
import com.uptute.backend.exceptions.AccessTokenException;

public interface AuthClient {
    Account logIn(String accessToken) throws AccessTokenException;
}
