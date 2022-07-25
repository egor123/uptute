package com.uptute.backend.account.servicies;

import org.springframework.stereotype.Service;

import com.uptute.backend.account.entities.User;
import com.uptute.backend.account.enums.ERole;
import com.uptute.backend.grpc.account.TutorDetails;

@Service
public class TutorDetailsServiceImpl extends DetailsServiceBase<TutorDetails> {

    @Override
    protected TutorDetails getDetails(User user) {
        return user.getTutorDetails();
    }

    @Override
    protected void setDetails(User user, TutorDetails details) {
        user.setTutorDetails(details);
    }

    @Override
    protected ERole getRole() {
        return ERole.ROLE_TUTOR;
    }
}