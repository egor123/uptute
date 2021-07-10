package com.uptute.payloads;

import lombok.*;

@Getter
@AllArgsConstructor
@ToString
public class TutorShortInfoResponse{
    private String UUID;
    private String firstName;
    private String lastName;
    private String imgUrl;
    private String moto;
    private Float rating;
    private float pph;
    private float hours;
    private int comments;
}
