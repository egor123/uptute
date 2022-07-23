package com.uptute.backend.account.servicies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.uptute.backend.account.entities.User;
import com.uptute.backend.account.exceptions.UserAlreadyExistsException;
import com.uptute.backend.account.exceptions.WrongEmailOrPasswordException;
import com.uptute.backend.account.repositories.UserRepository;

@Service
public class AccountCreationServiceImpl implements AccountCreationService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public User createNewAccount(String email, String password) throws UserAlreadyExistsException {
        if (repository.existsByEmail(email))
            throw new UserAlreadyExistsException(email);
        var usr = new User(email, encoder.encode(password));
        return repository.save(usr);
    }

    @Override
    public User getAccount(String email, String password) throws WrongEmailOrPasswordException {
        if (!repository.existsByEmail(email)) //FIXME !!!!!!!!!!!!!!!!!!!!
            throw new WrongEmailOrPasswordException();
        var usr = repository.findByEmail(email).get();
        if (!encoder.matches(password, usr.getPassword()))
            throw new WrongEmailOrPasswordException();
        return usr;
    }

}
