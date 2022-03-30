package com.uptute.backend.payloads.auth;

import lombok.Data;
import lombok.NonNull;

@Data
public class SignupRequest {
    //TODO validation!!!!
    @NonNull
    private String email;
    @NonNull
    private String password;
    @NonNull
    private String firstName;
    @NonNull
    private String lastName;
}
