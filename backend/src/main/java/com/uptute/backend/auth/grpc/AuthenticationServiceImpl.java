package com.uptute.backend.auth.grpc;

import org.springframework.beans.factory.annotation.Autowired;

import com.uptute.backend.account.exceptions.UserAlreadyExistsException;
import com.uptute.backend.account.exceptions.WrongEmailOrPasswordException;
import com.uptute.backend.account.servicies.AccountCreationService;
import com.uptute.backend.auth.jwt.JwtAuthenticationProvider;
import com.uptute.backend.grpc.auth.JwtResponse;
import com.uptute.backend.grpc.auth.RefreshTokenRequest;
import com.uptute.backend.grpc.auth.ShortJwtResponse;
import com.uptute.backend.grpc.auth.SigninRequest;
import com.uptute.backend.grpc.auth.SignupRequest;
import com.uptute.backend.grpc.auth.AuthenticationServiceGrpc.AuthenticationServiceImplBase;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;

@GrpcService
public class AuthenticationServiceImpl extends AuthenticationServiceImplBase {

    @Autowired
    private JwtAuthenticationProvider jwtProvider;

    @Autowired
    private AccountCreationService accountService;

    @Override
    public void signup(SignupRequest request, StreamObserver<JwtResponse> observer) {
        // TODO request valdation!!!!!
        try {
            var usr = accountService.createNewAccount(request.getEmail(), request.getPassword());
            var jwt = jwtProvider.generateJwtToken(usr);
            observer.onNext(JwtResponse.newBuilder()
                    .setTokenType("Bearer")
                    .setJwt(jwt)
                    .build());// FIXME
            observer.onCompleted();
        } catch (UserAlreadyExistsException e) {
            observer.onError(e);
        }

    }

    @Override
    public void signin(SigninRequest request, StreamObserver<JwtResponse> observer) {
        // TODO request valdation!!!!!
        try {
            var usr = accountService.getAccount(request.getEmail(), request.getPassword());
            var jwt = jwtProvider.generateJwtToken(usr);
            observer.onNext(JwtResponse.newBuilder()
                    .setTokenType("Bearer")
                    .setJwt(jwt)
                    .addAllRoles(usr.getRoles().stream().map(r -> r.getName().toString()).toList())
                    .build());// FIXME
            observer.onCompleted();
        } catch (WrongEmailOrPasswordException e) {
            observer.onError(e);
        }
    }

    @Override
    public void refreshToken(RefreshTokenRequest request, StreamObserver<ShortJwtResponse> observer) {
        // TODO
        observer.onCompleted();
    }
}
