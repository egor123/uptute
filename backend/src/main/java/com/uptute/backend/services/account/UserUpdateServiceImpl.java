package com.uptute.backend.services.account;

import java.util.function.Function;

import javax.validation.Validator;

import com.uptute.backend.entities.User;
import com.uptute.backend.exceptions.InvalidParamException;
import com.uptute.backend.payloads.account.StudentDetailsPayload;
import com.uptute.backend.payloads.account.TutorDetailsPayload;
import com.uptute.backend.payloads.account.UserDetailsPayload;
import com.uptute.backend.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class UserUpdateServiceImpl implements UserUpdateService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Validator validator;

    @Override
    public UserDetailsPayload updateUserDetails(Authentication auth, UserDetailsPayload request)
            throws InvalidParamException {
        return updateDetails(request, auth, User::getUserDetails);
    }

    @Override
    public StudentDetailsPayload updateStudentDetails(Authentication auth, StudentDetailsPayload request)
            throws InvalidParamException {
        return updateDetails(request, auth, User::getStudentDetails);
    }

    @Override
    public TutorDetailsPayload updateTutorDetails(Authentication auth, TutorDetailsPayload request)
            throws InvalidParamException {
        return updateDetails(request, auth, User::getTutorDetails);
    }

    private <T> T updateDetails(T request, Authentication auth, Function<User, Object> getDetails) throws InvalidParamException{
        validateRequest(request);
        var user = userRepository.findByUUID(auth.getName()).get();
        setDetails(getDetails.apply(user), request);
        userRepository.save(user);
        return request;
    }

    private void validateRequest(Object request) throws InvalidParamException {
        for (var v : validator.validate(request)) {
            if (v.getInvalidValue() != null)
                throw new InvalidParamException(v.getMessage());
        }
    }

    private void setDetails(Object details, Object request) {
        try {
            for (var requestField : request.getClass().getDeclaredFields()) {
                var detailsField = details.getClass().getDeclaredField(requestField.getName());
                detailsField.setAccessible(true);
                requestField.setAccessible(true);
                var requestValue = requestField.get(request);
                var value = (requestValue != null) ? requestValue : detailsField.get(details);
                detailsField.set(details, value);
                requestField.set(request, value);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}