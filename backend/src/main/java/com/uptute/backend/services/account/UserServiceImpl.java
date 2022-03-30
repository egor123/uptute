package com.uptute.backend.services.account;

import java.util.Optional;

import com.uptute.backend.entities.User;
import com.uptute.backend.exceptions.WrongUUIDException;
import com.uptute.backend.payloads.account.GetUserDetailsResponse;
import com.uptute.backend.payloads.account.UpdateUserDetailsRequest;
import com.uptute.backend.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository repository;

    @Override
    public Optional<User> getAccount(String provider, String id) {
        // return repository.findByProviderAndId(provider, id);
        return null;
    }

    @Override
    public void registerNewAccaunt(User accaunt) {
        repository.save(accaunt);
    }

    @Override
    public void updateUserDetails(String UUID, UpdateUserDetailsRequest details) throws WrongUUIDException {
        var account = getAccount(UUID);
        var usrDet = account.getUserDetails();
        usrDet.setFirstName((details.firstName == "") ? usrDet.getFirstName() : details.getFirstName());
        usrDet.setFirstName((details.lastName == "") ? usrDet.getLastName() : details.getLastName());
        usrDet.setFirstName((details.pictureURL == "") ? usrDet.getPictureURL() : details.getPictureURL());
        repository.save(account);
    }

    @Override
    public GetUserDetailsResponse getUserDetails(String UUID) throws WrongUUIDException {
        var user = getAccount(UUID);
        var det = user.getUserDetails();
        return GetUserDetailsResponse.builder().firstName(det.getFirstName()).lastName(det.getLastName())
                .email(user.getEmail()).pictureURL(det.getPictureURL()).build();
    }

    private User getAccount(String UUID) throws WrongUUIDException {
        var optional = repository.findByUUID(UUID);
        if (optional.isPresent())
            return optional.get();
        throw new WrongUUIDException(UUID);
    }
}