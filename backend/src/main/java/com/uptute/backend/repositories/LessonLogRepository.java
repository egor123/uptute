package com.uptute.backend.repositories;

import com.uptute.backend.entities.LessonLog;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonLogRepository extends JpaRepository<LessonLog, Long> {
    
}
