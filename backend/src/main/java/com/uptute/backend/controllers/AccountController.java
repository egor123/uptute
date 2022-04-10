package com.uptute.backend.controllers;

import java.util.NoSuchElementException;

import javax.validation.Valid;

import com.uptute.backend.exceptions.AccountAlreadyHasRoleException;
import com.uptute.backend.exceptions.UserHasNotRoleException;
import com.uptute.backend.payloads.account.UpdateUserDetailsRequest;
import com.uptute.backend.payloads.account.UpgradeToStudentRequest;
import com.uptute.backend.payloads.account.UpgradeToTutorRequest;
import com.uptute.backend.payloads.account.UpgradeToUserRequst;
import com.uptute.backend.services.account.UserService;
import com.uptute.backend.services.account.UserUpgradeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    private UserService userService;

    @Autowired
    private UserUpgradeService upgradeService;

    @GetMapping("/me")
    public ResponseEntity<?> getUserDetails(Authentication auth) {
        return ResponseEntity.ok(userService.getUserDetails(auth));
    }

    @PatchMapping("/me")
    public ResponseEntity<?> updateUserDetails(Authentication auth,
            @RequestBody @Valid UpdateUserDetailsRequest request) {
        return ResponseEntity.ok(userService.updateUserDetails(auth, request));
    }

    @PostMapping("/me/user") 
    public ResponseEntity<?> upgradeToUser(Authentication auth, @RequestBody @Valid UpgradeToUserRequst request){
        try {
            return ResponseEntity.ok(upgradeService.upgradeToUser(auth, request));
        } catch (AccountAlreadyHasRoleException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/me/student")
    public ResponseEntity<?> upgradeToStudent(Authentication auth, @RequestBody @Valid UpgradeToStudentRequest request){
        try {
            return ResponseEntity.ok(upgradeService.upgradeToStudent(auth, request));
        } catch (AccountAlreadyHasRoleException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/me/tutor")
    public ResponseEntity<?> upgradeToTutor(Authentication auth, @RequestBody @Valid UpgradeToTutorRequest request) {
        try {
            return ResponseEntity.ok(upgradeService.upgradeToTutor(auth, request));
        } catch (AccountAlreadyHasRoleException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{UUID}/student")
    public ResponseEntity<?> getStudentDetails(@PathVariable String UUID) {
        try {
            return ResponseEntity.ok(userService.getStudentDetails(UUID));
        } catch (NoSuchElementException | UserHasNotRoleException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{UUID}/tutor")
    public ResponseEntity<?> getTutorDetails(@PathVariable String UUID) {
        try {
            return ResponseEntity.ok(userService.getTutorDetails(UUID));
        } catch (NoSuchElementException | UserHasNotRoleException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}