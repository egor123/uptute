package com.uptute.backend.account.repositories;

import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;

import com.uptute.backend.account.entities.User;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUUID(String uuid);

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    Boolean existsByEmailAndPassword(String email, String password);
}
