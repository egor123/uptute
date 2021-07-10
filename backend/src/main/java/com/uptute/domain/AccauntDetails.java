package com.uptute.domain;

import java.time.LocalDate;

import lombok.*;

@Getter
@AllArgsConstructor
@ToString
public class AccauntDetails {
    private String firstName;
    private String lastName;
    private String imgUrl;
    private LocalDate birthday;
    private Integer grade;
}
