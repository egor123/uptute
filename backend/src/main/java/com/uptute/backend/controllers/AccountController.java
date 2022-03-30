package com.uptute.backend.controllers;

import javax.validation.Valid;

import com.uptute.backend.exceptions.WrongUUIDException;
import com.uptute.backend.payloads.account.UpdateUserDetailsRequest;
import com.uptute.backend.services.account.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/account/{UUID}")
public class AccountController {
    @Autowired
    private UserService service;

    @PatchMapping("/user")
    public ResponseEntity<?> updateUserDetails(@PathVariable String UUID,
            @RequestBody @Valid UpdateUserDetailsRequest request) {
        try {
            service.updateUserDetails(UUID, request);
            return ResponseEntity.ok(null);
        } catch (WrongUUIDException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUserDetails(@PathVariable String UUID) {
        try {
            return ResponseEntity.ok(service.getUserDetails(UUID));
        } catch (WrongUUIDException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // @PostMapping("/student")
    // public ResponseEntity<?> UpgradeToStudent(@PathVariable String UUID) {

    // }
}
