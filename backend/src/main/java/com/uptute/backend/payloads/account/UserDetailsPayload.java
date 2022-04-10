package com.uptute.backend.payloads.account;

import java.util.Date;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDetailsPayload {
    @NotBlank(message = "{validation.firstName.required}")
    @Size(min = 3, message = "{validation.firstName.size.too_short}")
    @Size(max = 20, message = "{validation.firstName.size.too_long}")
    private String firstName;
    @NotBlank(message = "{validation.last_name.required}")
    @Size(min = 3, message = "{validation.last_name.size.too_short}")
    @Size(max = 20, message = "{validation.last_name.size.too_long}")
    private String lastName;
    @NotNull(message = "{validation.birthday.required}")
    private Date birthday; //yyyy-MM-dd    
}
