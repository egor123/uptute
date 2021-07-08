package com.uptute.payloads;

import lombok.*;

@Getter
@AllArgsConstructor
@ToString
public class TutorShortInfoResponse{
    private String UUID;
    private String name;
    private String imgUrl;
    private String zoomLink;
    private float rating;
    private float pph;
    private float hours;
    private int comments;
}
