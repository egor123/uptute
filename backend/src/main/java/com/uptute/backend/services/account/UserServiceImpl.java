package com.uptute.backend.services.account;

import java.util.NoSuchElementException;

import com.uptute.backend.entities.User;
import com.uptute.backend.enums.ERole;
import com.uptute.backend.exceptions.UserAlreadyHasRoleException;
import com.uptute.backend.exceptions.UserHasNotRoleException;
import com.uptute.backend.payloads.account.UserDetailsResponse;
import com.uptute.backend.payloads.account.StudentDetailsResponse;
import com.uptute.backend.payloads.account.TutorDetailsResponse;
import com.uptute.backend.payloads.account.UpdateUserDetailsRequest;
import com.uptute.backend.repositories.RoleRepository;
import com.uptute.backend.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public UserDetailsResponse updateUserDetails(Authentication auth, UpdateUserDetailsRequest details) {
        var user = getUser(auth);
        var usrDet = user.getUserDetails();
        user.setEmail((details.getEmail() == "") ? user.getEmail() : details.getEmail());
        usrDet.setFirstName((details.getFirstName() == "") ? usrDet.getFirstName() : details.getFirstName());
        usrDet.setLastName((details.getLastName() == "") ? usrDet.getLastName() : details.getLastName());
        return getUserDetails(userRepository.save(user));
    }

    @Override
    public UserDetailsResponse getUserDetails(Authentication auth) {
        return getUserDetails(getUser(auth));
    }

    @Override
    public Boolean upgradeToTutor(Authentication auth) throws UserAlreadyHasRoleException {
        var user = getUser(auth);
        if (hasRole(user, ERole.ROLE_TUTOR))
            throw new UserAlreadyHasRoleException(auth.getName(), ERole.ROLE_TUTOR);
        user.getRoles().add(roleRepository.findByName(ERole.ROLE_TUTOR)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found")));
        userRepository.save(user);
        return true;
    }

    @Override
    public StudentDetailsResponse getStudentDetails(String UUID)
            throws NoSuchElementException, UserHasNotRoleException {
        var user = userRepository.findByUUID(UUID).get();
        if (!hasRole(user, ERole.ROLE_STUDENT))
            throw new UserHasNotRoleException(UUID, ERole.ROLE_STUDENT);
        var det = user.getUserDetails();
        return new StudentDetailsResponse(det.getFirstName(), det.getLastName());
    }

    @Override
    public TutorDetailsResponse getTutorDetails(String UUID) throws NoSuchElementException, UserHasNotRoleException {
        var user = userRepository.findByUUID(UUID).get();
        if (!hasRole(user, ERole.ROLE_TUTOR))
            throw new UserHasNotRoleException(UUID, ERole.ROLE_TUTOR);
        var det = user.getUserDetails();
        return new TutorDetailsResponse(det.getFirstName(), det.getLastName());
    }

    private User getUser(Authentication auth) {
        return userRepository.findByUUID(auth.getName()).get();
    }

    private UserDetailsResponse getUserDetails(User user) {
        var det = user.getUserDetails();
        return new UserDetailsResponse(det.getFirstName(), det.getLastName(), user.getEmail());
    }

    private Boolean hasRole(User user, ERole role) {
        return user.getRoles().stream().anyMatch(r -> r.getName().equals(role));
    }
}