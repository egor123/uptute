package com.uptute.payloads;

import java.util.ArrayList;

import com.uptute.enums.*;

import lombok.*;

@Getter
@AllArgsConstructor
@ToString
public class TutorFullInfoResponse{
    private String UUID;
    private String name;
    private String imgUrl;
    private String zoomLink;

    private ArrayList<Subjects> subjects;
    private ArrayList<Languages> languages;

    private String moto;
    private String about;

    private float rating;
    private float pph;
    private float hours;
    private int comments;
}
