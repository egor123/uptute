package com.uptute.backend.payloads.account;

import lombok.*;

@Data
@AllArgsConstructor
public class UserDetailsResponse {
    private String firstName;
    private String lastName;
    private String email;
}
