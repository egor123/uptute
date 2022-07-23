package com.uptute.backend.account.entities;

import javax.persistence.*;

import com.uptute.backend.account.enums.ERole;

import lombok.*;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    @NonNull
    private ERole name;
}