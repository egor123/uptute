package com.uptute.backend.services.account;

import com.uptute.backend.exceptions.InvalidParamException;
import com.uptute.backend.payloads.account.StudentDetailsPayload;
import com.uptute.backend.payloads.account.TutorDetailsPayload;
import com.uptute.backend.payloads.account.UserDetailsPayload;

import org.springframework.security.core.Authentication;

public interface UserUpdateService {
    UserDetailsPayload updateUserDetails(Authentication auth, UserDetailsPayload request) throws InvalidParamException;

    StudentDetailsPayload updateStudentDetails(Authentication auth, StudentDetailsPayload request) throws InvalidParamException;

    TutorDetailsPayload updateTutorDetails(Authentication auth, TutorDetailsPayload request) throws InvalidParamException;

}
