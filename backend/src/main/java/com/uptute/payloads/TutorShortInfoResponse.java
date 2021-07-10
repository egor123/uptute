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
    private float rating;
    private float pph;
    private float hours;
    private int comments;
}
