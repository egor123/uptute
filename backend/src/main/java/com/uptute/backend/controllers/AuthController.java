package com.uptute.backend.controllers;

import javax.validation.Valid;

import com.uptute.backend.exceptions.AccessTokenException;
import com.uptute.backend.exceptions.AuthProviderException;
import com.uptute.backend.exceptions.TokenRefreshException;
import com.uptute.backend.payloads.auth.SignInRequest;
import com.uptute.backend.payloads.auth.TokenRefreshRequest;
import com.uptute.backend.services.auth.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/{provider}/signin")
    public ResponseEntity<?> authenticate(@PathVariable String provider, @RequestBody SignInRequest request) {
        try {
            return ResponseEntity.ok(service.logIn(request.getAccessToken(), provider));
        } catch (AuthProviderException | AccessTokenException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/refreshToken")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody TokenRefreshRequest request) {
        try {
            return ResponseEntity.ok(service.refreshToken(request.getRefreshToken()));
        } catch (TokenRefreshException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
