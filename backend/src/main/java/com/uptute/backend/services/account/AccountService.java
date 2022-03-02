package com.uptute.backend.services.account;

import java.util.Optional;

import com.uptute.backend.entities.Account;
import com.uptute.backend.exceptions.WrongUUIDException;
import com.uptute.backend.payloads.account.GetUserDetailsResponse;
import com.uptute.backend.payloads.account.UpdateUserDetailsRequest;

public interface AccountService {
    Optional<Account> getAccount(String provider, String id);

    void registerNewAccaunt(Account accaunt);

    void updateUserDetails(String UUID, UpdateUserDetailsRequest details) throws WrongUUIDException;

    GetUserDetailsResponse getUserDetails(String UUID) throws WrongUUIDException ;
}