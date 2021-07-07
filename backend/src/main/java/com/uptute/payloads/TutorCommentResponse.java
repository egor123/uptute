package com.uptute.payloads;

import lombok.*;

@Getter
@AllArgsConstructor
@ToString
public class TutorCommentResponse {
    public String lessonsId;

    public String userUUID;
    public String userName;

    private int rating;
    private String review;
}
