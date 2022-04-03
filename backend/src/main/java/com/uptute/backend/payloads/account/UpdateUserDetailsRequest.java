package com.uptute.backend.payloads.account;

import org.springframework.lang.Nullable;

import lombok.*;

@Data
@AllArgsConstructor
public class UpdateUserDetailsRequest {
    @Nullable
    private String firstName;
    @Nullable
    private String lastName;
    @Nullable
    private String email;
}
