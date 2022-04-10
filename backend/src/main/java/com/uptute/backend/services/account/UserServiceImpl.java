package com.uptute.backend.services.account;

import java.time.ZoneId;
import java.util.Date;
import java.util.NoSuchElementException;

import com.uptute.backend.entities.User;
import com.uptute.backend.enums.ERole;
import com.uptute.backend.exceptions.UserHasNotRoleException;
import com.uptute.backend.payloads.account.StudentDetailsResponse;
import com.uptute.backend.payloads.account.TutorDetailsResponse;
import com.uptute.backend.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User getUserDetails(Authentication auth) {
        return userRepository.findByUUID(auth.getName()).get();
    }

    @Override
    public StudentDetailsResponse getStudentDetails(String UUID)
            throws NoSuchElementException, UserHasNotRoleException {
        var user = userRepository.findByUUID(UUID).get();
        validateRoles(user, ERole.ROLE_STUDENT);
        var uDet = user.getUserDetails();
        var sDet = user.getStudentDetails();
        return new StudentDetailsResponse(UUID, uDet.getFirstName(), uDet.getLastName(), sDet.getGrade());
    }

    @Override
    public TutorDetailsResponse getTutorDetails(String UUID) throws NoSuchElementException, UserHasNotRoleException {
        var user = userRepository.findByUUID(UUID).get();
        validateRoles(user, ERole.ROLE_TUTOR);
        var uDet = user.getUserDetails();
        var age = new Date(new Date().getTime() - uDet.getBirthday().getTime()).toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getYear();
        return new TutorDetailsResponse(UUID, uDet.getFirstName(), uDet.getLastName(), age);
    }

    private void validateRoles(User user, ERole role) throws UserHasNotRoleException{
        if(user.getRoles().stream().anyMatch(r -> r.getName().equals(role)))
            throw new UserHasNotRoleException(user.getUUID(), role);
    }
}