package com.uptute.backend.services.auth;

import com.uptute.backend.domain.UserDetails;
import com.uptute.backend.domain.GoogleUserDetails;
import com.uptute.backend.domain.TutorDetails;
import com.uptute.backend.domain.StudentDetails;
import com.uptute.backend.entities.Account;
import com.uptute.backend.enums.EProvider;
import com.uptute.backend.exceptions.AccessTokenException;
import com.uptute.backend.services.account.AccountService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GoogleClientImpl implements AuthClient {

    private static final Logger log = LoggerFactory.getLogger(GoogleClientImpl.class);

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private AccountService accauntService;

    @Override
    public Account logIn(String accessToken) throws AccessTokenException {
        try {
            var url = "https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + accessToken.toString();
            var details = restTemplate.getForObject(url, GoogleUserDetails.class);
            return getAccaunt(details);

        } catch (Exception e) {
            throw new AccessTokenException();
        }
    }

    private Account getAccaunt(GoogleUserDetails details) {
        var optional = accauntService.getAccount("google", details.getId());
        if (optional.isPresent()) {
            return optional.get();
        } else {
            var accauntDetails = UserDetails.builder().email(details.getEmail()).firstName(details.getGiven_name())
                    .lastName(details.getFamily_name()).pictureURL(details.getPicture()).build();
            var accaunt = new Account(EProvider.GOOGLE, details.getId(), accauntDetails, new StudentDetails(), new TutorDetails());
            accauntService.registerNewAccaunt(accaunt);
            return accaunt;
        }
    }
}