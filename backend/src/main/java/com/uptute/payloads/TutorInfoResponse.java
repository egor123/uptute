package com.uptute.payloads;

import java.util.ArrayList;

import com.uptute.domain.Audience;
import com.uptute.enums.*;

import lombok.*;

@Getter
@AllArgsConstructor
@ToString
public class TutorInfoResponse{
    private String UUID;
    private String firstName;
    private String lastName;
    private String imgUrl;
    private String zoomLink;

    private ArrayList<Subjects> subjects;
    private ArrayList<Languages> languages;
    private Audience audience;
    
    private String moto;
    private String about;
    private int age;

    private float rating;
    private float pph;
    private float hours;
    private int comments;
}
