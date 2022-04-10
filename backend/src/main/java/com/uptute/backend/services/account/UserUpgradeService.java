package com.uptute.backend.services.account;

import com.uptute.backend.exceptions.AccountAlreadyHasRoleException;
import com.uptute.backend.payloads.account.UpgradeToStudentRequest;
import com.uptute.backend.payloads.account.UpgradeToTutorRequest;
import com.uptute.backend.payloads.account.UpgradeToUserRequst;
import com.uptute.backend.payloads.auth.ShortJwtResponse;

import org.springframework.security.core.Authentication;

public interface UserUpgradeService {
        ShortJwtResponse upgradeToUser(Authentication auth, UpgradeToUserRequst request)
                        throws AccountAlreadyHasRoleException;

        ShortJwtResponse upgradeToStudent(Authentication auth, UpgradeToStudentRequest request)
                        throws AccountAlreadyHasRoleException;

        ShortJwtResponse upgradeToTutor(Authentication auth, UpgradeToTutorRequest request)
                        throws AccountAlreadyHasRoleException;
}
