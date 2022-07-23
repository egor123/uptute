package com.uptute.backend.account.servicies;

import org.springframework.stereotype.Service;

import com.uptute.backend.account.entities.User;
import com.uptute.backend.account.enums.ERole;
import com.uptute.backend.grpc.account.UserDetails;

@Service
public class UserDetailsServiceImpl extends DetailsServiceBase<UserDetails> {

    @Override
    protected UserDetails getDetails(User user) {
        return  user.getUserDetails();
    }

    @Override
    protected void setDetails(User user, UserDetails details) {
        user.setUserDetails(details);        
    }

	@Override
	protected ERole getRole() {
        return ERole.ROLE_USER;
	}
}