package com.uptute.backend.entities;

import java.util.Date;

import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.uptute.backend.enums.lesson.ELogStatus;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;

import lombok.*;

@RequiredArgsConstructor
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "lesson_logs")
public class LessonLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NonNull
    @Enumerated(EnumType.STRING)
    private ELogStatus status;
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    private Lesson lesson;
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    @NonNull
    private String createdBy;
    @NonNull
    private String details;

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
