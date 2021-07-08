package com.uptute.domain;

import lombok.*;

@Getter
@AllArgsConstructor
@ToString
public class Accaunt {
    private String UUID;
    private UserDetails userDetails;
    private TutorDetails tutorDetails;
}
