package com.uptute.backend.payloads.account;

import lombok.*;

@Data
@Builder
public class GetUserDetailsResponse {
    @NonNull
    public String firstName;
    @NonNull
    public String lastName;
    @NonNull
    public String email;
    @NonNull
    public String pictureURL;
}
