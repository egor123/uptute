package com.uptute.domain;

import java.util.ArrayList;

import com.uptute.enums.*;
import lombok.*;

@Getter
@AllArgsConstructor
@ToString
public class TutorDetails {
    private ArrayList<String> lessonsId;

    private String zoomLink;
    private float pph;
    private ArrayList<Subjects> subjects;
    private ArrayList<Languages> languages;
    private Audience audience;

    private String moto;
    private String about;
}
