package com.uptute.backend.controllers;

import java.util.NoSuchElementException;

import com.uptute.backend.exceptions.LessonIsClosedException;
import com.uptute.backend.exceptions.LogAlreadyExists;
import com.uptute.backend.payloads.lessons.InitializeLessonRequest;
import com.uptute.backend.payloads.lessons.RejectOfferRequest;
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

    // ------------------------------------------STUDENT------------------------------------------

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

    @GetMapping("/{lessonId}/offers")
    public ResponseEntity<?> getOffers(@PathVariable Long lessonId) {
        try {
            return ResponseEntity.ok(lessonService.getOffers(lessonId));
        } catch (NoSuchElementException | LessonIsClosedException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{lessonId}/reject/{userUUID}")
    public ResponseEntity<?> rejectOffer(@PathVariable Long lessonId, @PathVariable String userUUID,
            @RequestBody RejectOfferRequest request) {
        try{
            return ResponseEntity.ok(lessonService.rejectOffer(lessonId, userUUID, request.getTutorUUID()));
        }
        catch(NoSuchElementException | LessonIsClosedException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ------------------------------------------TUTOR------------------------------------------

    @GetMapping("/open")
    public ResponseEntity<?> getOpenLessons() {
        return ResponseEntity.ok(lessonService.getOpenLessons());
    }

    @PostMapping("/{lessonId}/offer/{userUUID}")
    public ResponseEntity<?> createOffer(@PathVariable Long lessonId, @PathVariable String userUUID) {
        try {
            return ResponseEntity.ok(lessonService.createOffer(userUUID, lessonId));
        } catch (LogAlreadyExists | NoSuchElementException | LessonIsClosedException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{lessonId}/offer/cancel/{userUUID}")
    public ResponseEntity<?> cancelOffer(@PathVariable Long lessonId, @PathVariable String userUUID) {
        try {
            return ResponseEntity.ok(lessonService.cancelOffer(lessonId, userUUID));
        } catch (LessonIsClosedException | NoSuchElementException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ------------------------------------------ADMIN------------------------------------------

    @GetMapping("/{lessonId}")
    public ResponseEntity<?> getLessonLogs(@PathVariable Long lessonId) {
        try {
            return ResponseEntity.ok(lessonService.getLessonLogs(lessonId));
        } catch (NoSuchElementException | LessonIsClosedException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // @PostMapping("/{id}") //approve lesson by student

    // @GetMapping("/find") //tutor get all???
    // @GetMapping
}
