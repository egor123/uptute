package com.uptute.backend.services.account;

import com.uptute.backend.payloads.account.UserDetailsResponse;

import java.util.NoSuchElementException;

import com.uptute.backend.exceptions.UserAlreadyHasRoleException;
import com.uptute.backend.exceptions.UserHasNotRoleException;
import com.uptute.backend.payloads.account.StudentDetailsResponse;
import com.uptute.backend.payloads.account.TutorDetailsResponse;
import com.uptute.backend.payloads.account.UpdateUserDetailsRequest;

import org.springframework.security.core.Authentication;

public interface UserService {
    UserDetailsResponse updateUserDetails(Authentication auth, UpdateUserDetailsRequest details);

    UserDetailsResponse getUserDetails(Authentication auth);

    Boolean upgradeToTutor(Authentication auth) throws UserAlreadyHasRoleException;

    StudentDetailsResponse getStudentDetails(String UUID) throws NoSuchElementException, UserHasNotRoleException;

    TutorDetailsResponse getTutorDetails(String UUID) throws NoSuchElementException, UserHasNotRoleException;
}