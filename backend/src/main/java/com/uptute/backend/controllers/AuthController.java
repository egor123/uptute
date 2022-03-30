package com.uptute.backend.controllers;

import javax.validation.Valid;

import com.uptute.backend.exceptions.TokenRefreshException;
import com.uptute.backend.payloads.auth.SigninRequest;
import com.uptute.backend.payloads.auth.SignupRequest;
import com.uptute.backend.payloads.auth.TokenRefreshRequest;
import com.uptute.backend.services.auth.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody @Valid SignupRequest request) {
        try {
            return ResponseEntity.ok(service.signup(request));
        } catch (Exception e) { //TODO proper exceptions!
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody @Valid SigninRequest request) {
        try {
            return ResponseEntity.ok(service.signin(request));
        } catch (Exception e) { //TODO proper exceptions!
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/refreshToken") //TODO
    public ResponseEntity<?> refreshToken(@Valid @RequestBody TokenRefreshRequest request) {
        try {
            return ResponseEntity.ok(service.refreshToken(request.getRefreshToken()));
        } catch (TokenRefreshException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
