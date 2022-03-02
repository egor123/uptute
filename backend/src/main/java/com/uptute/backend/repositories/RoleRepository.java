package com.uptute.backend.repositories;

import java.util.Optional;

import com.uptute.backend.entities.Role;
import com.uptute.backend.enums.ERole;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}