package com.uptute.backend.account.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.uptute.backend.account.converters.StudentDetailsConverter;
import com.uptute.backend.account.converters.TutorDetailsConverter;
import com.uptute.backend.account.converters.UserDetailsConverter;
import com.uptute.backend.grpc.account.StudentDetails;
import com.uptute.backend.grpc.account.TutorDetails;
import com.uptute.backend.grpc.account.UserDetails;

import org.hibernate.annotations.GenericGenerator;

import lombok.*;

@Data
@RequiredArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users", uniqueConstraints = { @UniqueConstraint(columnNames = "email") })
public class User {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String UUID;
    @NonNull
    @Size(max = 50)
    @Email
    private String email;
    @NonNull
    @JsonIgnore
    @Size(max = 120)
    private String password;
    // --------------------------------------------------------
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_uuid"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();
    // --------------------------------------------------------
    @Convert(converter = UserDetailsConverter.class) //FIXME does not works with grpc payloads!!!!!
    private UserDetails userDetails = UserDetails.newBuilder().build();
    @Convert(converter = StudentDetailsConverter.class)
    private StudentDetails studentDetails = StudentDetails.newBuilder().build();
    @Convert(converter = TutorDetailsConverter.class)
    private TutorDetails tutorDetails = TutorDetails.newBuilder().build();
}