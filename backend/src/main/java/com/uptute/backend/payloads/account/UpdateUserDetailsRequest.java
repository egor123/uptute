package com.uptute.backend.payloads.account;

import org.springframework.lang.Nullable;

import lombok.*;

@Data
@AllArgsConstructor
public class UpdateUserDetailsRequest {
    @Nullable
    public String firstName;
    @Nullable
    public String lastName;
    @Nullable
    public String email;
    @Nullable
    public String pictureURL;
}
