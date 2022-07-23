package com.uptute.backend.account.repositories;

import java.util.Optional;


import org.springframework.data.jpa.repository.JpaRepository;

import com.uptute.backend.account.entities.Role;
import com.uptute.backend.account.enums.ERole;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}