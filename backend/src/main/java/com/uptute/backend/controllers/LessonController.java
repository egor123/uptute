package com.uptute.backend.controllers;

import java.util.NoSuchElementException;

import com.uptute.backend.exceptions.LogIsClosedException;
import com.uptute.backend.exceptions.UnsupportedParentLogType;
import com.uptute.backend.enums.lesson.ELogType;
import com.uptute.backend.exceptions.LogAlreadyExists;
import com.uptute.backend.payloads.lessons.CreateLessonRequest;
import com.uptute.backend.payloads.lessons.InitializeConferenceRequest;
import com.uptute.backend.services.lessons.LessonService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    // ------------------------------------------LOG-CREATION------------------------------------------

    @PostMapping("/create/{userUUID}")
    public ResponseEntity<?> createLesson(@PathVariable String userUUID, @RequestBody CreateLessonRequest request) {
        try {
            return ResponseEntity.ok(lessonService.createLog(null, ELogType.CREATED, userUUID, request));
        } catch (NoSuchElementException | LogIsClosedException | LogAlreadyExists | UnsupportedParentLogType e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/logs/{logId}/close/{userUUID}")
    public ResponseEntity<?> cancelLog(@PathVariable Long logId, @PathVariable String userUUID) {
        try {
            return ResponseEntity.ok(lessonService.createLog(logId, ELogType.CLOSED, userUUID, null));
        } catch (NoSuchElementException | LogIsClosedException | LogAlreadyExists | UnsupportedParentLogType e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/logs/{logId}/offer/{userUUID}")
    public ResponseEntity<?> createOffer(@PathVariable Long logId, @PathVariable String userUUID) {
        try {
            return ResponseEntity.ok(lessonService.createLog(logId, ELogType.OFFER, userUUID, null));
        } catch (NoSuchElementException | LogIsClosedException | LogAlreadyExists | UnsupportedParentLogType e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/logs/{logId}/accept/{userUUID}")
    public ResponseEntity<?> acceptOffer(@PathVariable Long logId, @PathVariable String userUUID) {
        try {
            return ResponseEntity.ok(lessonService.createLog(logId, ELogType.ACCEPTED, userUUID, null));
        } catch (NoSuchElementException | LogIsClosedException | LogAlreadyExists | UnsupportedParentLogType e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/logs/{logId}/init/{userUUID}")
    public ResponseEntity<?> initiateConference(@PathVariable Long logId, @PathVariable String userUUID,
            @RequestBody InitializeConferenceRequest request) {
        try {
            return ResponseEntity.ok(lessonService.createLog(logId, ELogType.INIT, userUUID, request));
        } catch (NoSuchElementException | LogIsClosedException | LogAlreadyExists | UnsupportedParentLogType e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ------------------------------------------LOG-OBSERVATION------------------------------------------

    @GetMapping("/logs/{logId}/offer/{userUUID}")
    public ResponseEntity<?> checkForOffers(@PathVariable Long logId) {
        try {
            return ResponseEntity.ok(lessonService.observeLog(logId, ELogType.OFFER));
        } catch (NoSuchElementException | LogIsClosedException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/logs/{logId}/accepted/{userUUID}")
    public ResponseEntity<?> checkForAccepted(@PathVariable Long logId) {
        try {
            return ResponseEntity.ok(lessonService.observeLog(logId, ELogType.ACCEPTED));
        } catch (NoSuchElementException | LogIsClosedException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/logs/{logId}/init/{userUUID}")
    public ResponseEntity<?> checkForInit(@PathVariable Long logId) {
        try {
            return ResponseEntity.ok(lessonService.observeLog(logId, ELogType.INIT));
        } catch (NoSuchElementException | LogIsClosedException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ------------------------------------------------------------------------------------------

    @GetMapping("/open/{userUUID}")
    public ResponseEntity<?> getOpenLessons(@PathVariable String userUUID) {
        return ResponseEntity.ok(lessonService.getOpenLessons(userUUID));
    }

    // ------------------------------------------------------------------------------------------

    @GetMapping("/{lessonId}/{userUUID}")
    public ResponseEntity<?> getLessonLogs(@PathVariable Long lessonId) {
        try {
            return ResponseEntity.ok(lessonService.getLessonLogs(lessonId));
        } catch (NoSuchElementException | LogIsClosedException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
