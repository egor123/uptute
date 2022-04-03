package com.uptute.backend.controllers;

import java.util.NoSuchElementException;

import javax.validation.Valid;

import com.uptute.backend.exceptions.UserAlreadyHasRoleException;
import com.uptute.backend.exceptions.UserHasNotRoleException;
import com.uptute.backend.payloads.account.UpdateUserDetailsRequest;
import com.uptute.backend.services.account.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private UserService service;

    @GetMapping("/me")
    public ResponseEntity<?> getUserDetails(Authentication auth) {
        return ResponseEntity.ok(service.getUserDetails(auth));
    }

    @PatchMapping("/me")
    public ResponseEntity<?> updateUserDetails(Authentication auth,
            @RequestBody @Valid UpdateUserDetailsRequest request) {
        return ResponseEntity.ok(service.updateUserDetails(auth, request));
    }

    @PostMapping("/me/tutor")
    public ResponseEntity<?> upgradeToTutor(Authentication auth) {
        try {
            return ResponseEntity.ok(service.upgradeToTutor(auth));
        } catch (UserAlreadyHasRoleException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{UUID}/student")
    public ResponseEntity<?> getStudentDetails(@PathVariable String UUID) {
        try {
            return ResponseEntity.ok(service.getStudentDetails(UUID));
        } catch (NoSuchElementException | UserHasNotRoleException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{UUID}/tutor")
    public ResponseEntity<?> getTutorDetails(@PathVariable String UUID) {
        try {
            return ResponseEntity.ok(service.getTutorDetails(UUID));
        } catch (NoSuchElementException | UserHasNotRoleException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}