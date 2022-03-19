package com.uptute.backend.repositories;

import java.util.Optional;

import com.uptute.backend.entities.Account;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, String> {
    long count();
    Optional<Account> findByUUID(String uuid);
    Optional<Account> findByProviderAndId(String provider, String id);
}
