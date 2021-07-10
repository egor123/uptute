package com.uptute.domain;

import lombok.*;

@Getter
@AllArgsConstructor
@ToString
public class Lesson {
    private String id;

    private String userUUID;
    private String tutorUUID;

    private float duration;
    private float invoice;

    private Integer rating;
    private String review;
}
