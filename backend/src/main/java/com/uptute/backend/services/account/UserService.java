package com.uptute.backend.services.account;

import java.util.Optional;

import com.uptute.backend.entities.User;
import com.uptute.backend.exceptions.WrongUUIDException;
import com.uptute.backend.payloads.account.GetUserDetailsResponse;
import com.uptute.backend.payloads.account.UpdateUserDetailsRequest;

public interface UserService {
    Optional<User> getAccount(String provider, String id);

    void registerNewAccaunt(User accaunt);

    void updateUserDetails(String UUID, UpdateUserDetailsRequest details) throws WrongUUIDException;

    GetUserDetailsResponse getUserDetails(String UUID) throws WrongUUIDException;
}