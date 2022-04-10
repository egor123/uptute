package com.uptute.backend.services.account;

import com.uptute.backend.exceptions.AccountAlreadyHasRoleException;
import com.uptute.backend.payloads.account.StudentDetailsPayload;
import com.uptute.backend.payloads.account.TutorDetailsPayload;
import com.uptute.backend.payloads.account.UserDetailsPayload;
import com.uptute.backend.payloads.auth.ShortJwtResponse;

import org.springframework.security.core.Authentication;

public interface UserUpgradeService {
        ShortJwtResponse upgradeToUser(Authentication auth, UserDetailsPayload request)
                        throws AccountAlreadyHasRoleException;

        ShortJwtResponse upgradeToStudent(Authentication auth, StudentDetailsPayload request)
                        throws AccountAlreadyHasRoleException;

        ShortJwtResponse upgradeToTutor(Authentication auth, TutorDetailsPayload request)
                        throws AccountAlreadyHasRoleException;
}
