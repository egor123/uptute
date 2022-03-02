package com.uptute.backend.services.account;

import java.util.Optional;

import com.uptute.backend.entities.Account;
import com.uptute.backend.exceptions.WrongUUIDException;
import com.uptute.backend.payloads.account.GetUserDetailsResponse;
import com.uptute.backend.payloads.account.UpdateUserDetailsRequest;
import com.uptute.backend.repositories.AccountRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImpl implements AccountService {
    @Autowired
    private AccountRepository repository;

    @Override
    public Optional<Account> getAccount(String provider, String id) {
        return repository.findByProviderAndId(provider, id);
    }

    @Override
    public void registerNewAccaunt(Account accaunt) {
        repository.save(accaunt);
    }

    @Override
    public void updateUserDetails(String UUID, UpdateUserDetailsRequest details) throws WrongUUIDException {
        var account = getAccount(UUID);
        var usrDet = account.getUserDetails();
        usrDet.setFirstName((details.firstName == "") ? usrDet.getFirstName() : details.getFirstName());
        usrDet.setFirstName((details.lastName == "") ? usrDet.getLastName() : details.getLastName());
        usrDet.setFirstName((details.email == "") ? usrDet.getEmail() : details.getEmail());
        usrDet.setFirstName((details.pictureURL == "") ? usrDet.getPictureURL() : details.getPictureURL());
        repository.save(account);
    }

    @Override
    public GetUserDetailsResponse getUserDetails(String UUID) throws WrongUUIDException {
        var det = getAccount(UUID).getUserDetails();
        return GetUserDetailsResponse.builder().firstName(det.getFirstName()).lastName(det.getLastName())
                .email(det.getEmail()).pictureURL(det.getPictureURL()).build();
    }

    private Account getAccount(String UUID) throws WrongUUIDException {
        var optional = repository.findByUUID(UUID);
        if (optional.isPresent())
            return optional.get();
        throw new WrongUUIDException(UUID);
    }
}