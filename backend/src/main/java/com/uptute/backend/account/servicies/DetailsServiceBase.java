package com.uptute.backend.account.servicies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.protobuf.Message;
import com.uptute.backend.account.entities.User;
import com.uptute.backend.account.enums.ERole;
import com.uptute.backend.account.exceptions.AccountAlreadyHasRoleException;
import com.uptute.backend.account.repositories.RoleRepository;
import com.uptute.backend.account.repositories.UserRepository;
import com.uptute.backend.auth.jwt.JwtAuthenticationProvider;
import com.uptute.backend.grpc.account.JwtResponse;

import io.grpc.stub.StreamObserver;

public abstract class DetailsServiceBase<T extends Message> {

    public final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private JwtAuthenticationProvider jwtProvider;

    protected abstract T getDetails(User user);

    protected abstract void setDetails(User user, T details);

    protected abstract ERole getRole();

    public void upgradeDetails(StreamObserver<JwtResponse> observer, T details) {
        var user = userRepository.findByUUID(getUuid()).get();
        var role = roleRepository.findByName(getRole()).get();
        if (user.getRoles().contains(role)) {
            observer.onError(new AccountAlreadyHasRoleException(user.getUUID(), role.getName()));
        } else {
            user.getRoles().add(role);
            setDetails(user, details);
            user = userRepository.save(user);
            observer.onNext(JwtResponse.newBuilder()
                    .setJwt(jwtProvider.generateJwtToken(user))
                    .setTokenType("Bearer")
                    .addAllRoles(user.getRoles().stream().map(r -> r.getName().toString()).toList())
                    .build());
            observer.onCompleted();
        }
    }

    public void getDetails(StreamObserver<T> observer) {
        observer.onNext(getDetails(userRepository.findByUUID(getUuid()).get()));
        observer.onCompleted();
    }

    public void updateDetails(StreamObserver<T> observer, T details) {
        var user = userRepository.findByUUID(getUuid()).get();
        var oldDetails = getDetails(user);
        try {
            for (var field : details.getClass().getDeclaredFields()) {
                field.setAccessible(true);
                field.set(details, (field.get(details) != null) ? field.get(details) : field.get(oldDetails));
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        setDetails(user, details);
        userRepository.save(user);
        observer.onNext(details);
        observer.onCompleted();
    }

    private String getUuid() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    // private T getDetails(User user, T dummyDetails){
    //     for (var field : dummyDetails.getClass().getDeclaredFields()) {
    //         if(field.getClass().isAssignableFrom(dummyDetails.getClass())){
    //             field.setAccessible(true);
    //             try {
    //                 return (T) field.get(user);
    //             } catch (IllegalArgumentException | IllegalAccessException e) {
    //                 throw new RuntimeException(e);
    //             }
    //         }
    //     }
    //     return null;
    // }
}