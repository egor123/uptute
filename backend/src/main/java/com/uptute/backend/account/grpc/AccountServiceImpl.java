package com.uptute.backend.account.grpc;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;

import com.google.protobuf.Empty;
import com.uptute.backend.account.servicies.StudentDetailsServiceImpl;
import com.uptute.backend.account.servicies.TutorDetailsServiceImpl;
import com.uptute.backend.account.servicies.UserDetailsServiceImpl;
import com.uptute.backend.grpc.account.JwtResponse;
import com.uptute.backend.grpc.account.StudentDetails;
import com.uptute.backend.grpc.account.TutorDetails;
import com.uptute.backend.grpc.account.UserDetails;
import com.uptute.backend.grpc.account.AccountServiceGrpc.AccountServiceImplBase;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;

@GrpcService
public class AccountServiceImpl extends AccountServiceImplBase {

    @Autowired
    private UserDetailsServiceImpl userService;

    @Autowired
    private StudentDetailsServiceImpl studentService;

    @Autowired
    private TutorDetailsServiceImpl tutorService;

    @Override
    @PreAuthorize("permitAll()") // TODO TEST //TODO validation
    public void upgradeToUser(UserDetails request, StreamObserver<JwtResponse> observer) {
        userService.upgradeDetails(observer, request);
    }

    @Override
    @PreAuthorize("hasRole('USER')")
    public void getUserDetails(Empty request, StreamObserver<UserDetails> observer) {
        userService.getDetails(observer);
    }

    @Override
    @PreAuthorize("hasRole('USER')")
    public void updateUserDetails(UserDetails request, StreamObserver<UserDetails> observer) {
        userService.updateDetails(observer, request);

    }

    // ---------------------------------------------------------------
    @Override
    @PreAuthorize("hasRole('USER')")
    public void upgradeToStudent(StudentDetails request, StreamObserver<JwtResponse> observer) {
        studentService.upgradeDetails(observer, request);
    }

    @Override
    @PreAuthorize("hasRole('STUDENT')")
    public void getStudentDetails(Empty request, StreamObserver<StudentDetails> observer) {
        studentService.getDetails(observer);

    }

    @Override
    @PreAuthorize("hasRole('STUDENT')")
    public void updateStudentDetails(StudentDetails request, StreamObserver<StudentDetails> observer) {
        studentService.updateDetails(observer, request);
    }

    // --------------------------------------------------------------- @Override
    @Override
    @PreAuthorize("hasRole('USER')")
    public void upgradeToTutor(TutorDetails request, StreamObserver<JwtResponse> observer) {
        tutorService.upgradeDetails(observer, request);
    }

    @Override
    @PreAuthorize("hasRole('TUTOR')")
    public void getTutorDetails(Empty request, StreamObserver<TutorDetails> observer) {
        tutorService.getDetails(observer);
    }

    @Override
    @PreAuthorize("hasRole('TUTOR')")
    public void updateTutorDetails(TutorDetails request, StreamObserver<TutorDetails> observer) {
        tutorService.updateDetails(observer, request);
    }
    // ---------------------------------------------------------------
}