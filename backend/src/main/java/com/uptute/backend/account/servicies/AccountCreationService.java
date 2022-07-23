package com.uptute.backend.account.servicies;

import com.uptute.backend.account.entities.User;
import com.uptute.backend.account.exceptions.UserAlreadyExistsException;
import com.uptute.backend.account.exceptions.WrongEmailOrPasswordException;

public interface AccountCreationService {
    User createNewAccount(String email, String password) throws UserAlreadyExistsException;
    User getAccount(String email, String password) throws WrongEmailOrPasswordException;
}
