package com.uptute.backend.payloads.account;

import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.URL;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TutorDetailsPayload {
    @NotBlank(message = "{validation.conference_link.required}")
    @URL(message = "{validation.conference_link.invalid}")
    private String conferenceLink;
}