package com.uptute.backend.controllers;

import java.util.NoSuchElementException;

import com.uptute.backend.exceptions.LessonIsClosedException;
import com.uptute.backend.exceptions.OfferAlreadyCreated;
import com.uptute.backend.payloads.lessons.InitializeLessonRequest;
import com.uptute.backend.services.lessons.LessonService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/lessons")
public class LessonController {

    @Autowired
    private LessonService lessonService;

    @PostMapping("/init/{userUUID}")
    public ResponseEntity<?> initializeLesson(@RequestBody InitializeLessonRequest request,
            @PathVariable String userUUID) {
        return ResponseEntity.ok(lessonService.initializeLesson(userUUID, request));
    }

    @DeleteMapping("/{lessonId}/{userUUID}")
    public ResponseEntity<?> abortLesson(@PathVariable Long lessonId, @PathVariable String userUUID) {
        try {
            return ResponseEntity.ok(lessonService.abortLesson(userUUID, lessonId));
        } catch (NoSuchElementException | LessonIsClosedException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{lessonId}")
    public ResponseEntity<?> getLessonLogs(@PathVariable Long lessonId) {
        try {
            return ResponseEntity.ok(lessonService.getLessonLogs(lessonId));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/open")
    public ResponseEntity<?> getOpenLessons() {
        return ResponseEntity.ok(lessonService.getOpenLessons());
    }

    @PostMapping("/{lessonId}/offer/{userUUID}")
    public ResponseEntity<?> creaateOffer(@PathVariable Long lessonId, @PathVariable String userUUID) {
        try {
            return ResponseEntity.ok(lessonService.createOffer(userUUID, lessonId));
        } catch (OfferAlreadyCreated | NoSuchElementException | LessonIsClosedException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    // @PostMapping("/{id}") //approve lesson by student

    // @GetMapping("/find") //tutor get all???
    // @GetMapping
}
