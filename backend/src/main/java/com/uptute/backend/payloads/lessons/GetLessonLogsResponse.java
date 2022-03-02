package com.uptute.backend.payloads.lessons;

import java.util.ArrayList;

import com.uptute.backend.entities.LessonLog;

import lombok.*;

@Data
@Builder
public class GetLessonLogsResponse {
    @NonNull
    private Long lessonId;
    @NonNull
    private ArrayList<LessonLog> logs;
}
