package com.uptute.backend.repositories;

import java.util.List;
import java.util.Optional;

import com.uptute.backend.entities.Lesson;
import com.uptute.backend.enums.lesson.ELessonStatus;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonRepository extends JpaRepository<Lesson, Long> {
    Optional<Lesson> findById(Long id);
    
    List<Lesson> findByStatus(ELessonStatus status);
}
