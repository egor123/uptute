package com.uptute.backend.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import com.uptute.backend.converters.UserDetailsConverter;
import com.uptute.backend.converters.TutorDetailsConverter;
import com.uptute.backend.converters.UserDetailsConvrter;
import com.uptute.backend.domain.UserDetails;
import com.uptute.backend.domain.TutorDetails;
import com.uptute.backend.domain.StudentDetails;
import com.uptute.backend.enums.EProvider;

import org.hibernate.annotations.GenericGenerator;

import lombok.*;

@Data
@RequiredArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "accaunts")
public class Account {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String UUID;
    @NonNull
    @Enumerated(EnumType.ORDINAL)
    private EProvider provider;
    @NonNull
    private String id;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "accaunt_roles", joinColumns = @JoinColumn(name = "accaunt_uuid"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();
    @NonNull
    @Convert(converter = UserDetailsConverter.class)
    private UserDetails userDetails;
    @NonNull
    @Convert(converter = UserDetailsConvrter.class)
    private StudentDetails studentDetails;
    @NonNull
    @Convert(converter = TutorDetailsConverter.class)
    private TutorDetails tutorDetails;
}