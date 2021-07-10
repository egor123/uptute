package com.uptute.payloads;

import lombok.*;

@Getter
@AllArgsConstructor
@ToString
public class TutorCommentResponse {
    public String lessonsId;

    public String userUUID;
    public String userFirstName;
    public String userLastName;

    private int rating;
    private String review;
}
