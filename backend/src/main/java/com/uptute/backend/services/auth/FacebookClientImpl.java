package com.uptute.backend.services.auth;

import com.uptute.backend.entities.Account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class FacebookClientImpl implements AuthClient {

    @Autowired
    private RestTemplate restTemplate;

    private final String API_BASE = "https://graph.facebook.com";

    @Override
    public Account logIn(String accessToken) {
        // TODO Auto-generated method stub
        return null;
    }
}
