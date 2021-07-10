package com.uptute.domain;

import lombok.*;

@Getter
@AllArgsConstructor
@ToString
public class Accaunt {
    private String UUID;
    private AccauntDetails accauntDetails;
    private UserDetails userDetails;
    private TutorDetails tutorDetails;
}
