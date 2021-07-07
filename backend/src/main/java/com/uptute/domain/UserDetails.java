package com.uptute.domain;

import java.time.LocalDate;
import java.util.ArrayList;

import lombok.*;

@Getter
@AllArgsConstructor
@ToString
public class UserDetails {
    private ArrayList<String> lessonsId;

    private String imgUrl;
    private LocalDate birthday;
    private String name;
}
