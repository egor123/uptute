package com.uptute.backend.services.auth;

import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import com.uptute.backend.domain.UserDetails;
import com.uptute.backend.domain.UserDetailsImpl;
import com.uptute.backend.entities.User;
import com.uptute.backend.enums.ERole;
import com.uptute.backend.exceptions.EmailIsAlreadyTakenException;
import com.uptute.backend.exceptions.TokenRefreshException;
import com.uptute.backend.payloads.auth.JwtResponse;
import com.uptute.backend.payloads.auth.SigninRequest;
import com.uptute.backend.payloads.auth.SignupRequest;
import com.uptute.backend.payloads.auth.TokenRefreshResponse;
import com.uptute.backend.repositories.RoleRepository;
import com.uptute.backend.repositories.UserRepository;
import com.uptute.backend.security.jwt.JwtUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public JwtResponse signup(SignupRequest request) throws EmailIsAlreadyTakenException {
        var email = request.getEmail();
        var password = request.getPassword();
        if (userRepository.existsByEmail(email))
            throw new EmailIsAlreadyTakenException(email);
        var user = new User(email, encoder.encode(password));
        var details = UserDetails.builder().firstName(request.getFirstName()).lastName(request.getLastName()).build();
        user.setUserDetails(details);
        user.getRoles().add(roleRepository.findByName(ERole.ROLE_STUDENT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found")));
        userRepository.save(user);
        try {
            return signin(new SigninRequest(email, password));
        } catch (NoSuchElementException | AuthenticationException e) {
            return null;
        }
    }

    @Override
    public JwtResponse signin(SigninRequest request) throws NoSuchElementException, AuthenticationException {
        var uuid = userRepository.findByEmail(request.getEmail()).get().getUUID();
        var authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(uuid, request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        var userDetails = (UserDetailsImpl) authentication.getPrincipal();
        var jwt = jwtUtils.generateJwtToken(userDetails.getUUID());
        var roles = userDetails.getAuthorities().stream()
                .map(c -> c.getAuthority())
                .collect(Collectors.toList());
        var refreshToken = refreshTokenService.createRefreshToken(uuid);
        return new JwtResponse(jwt, refreshToken, userDetails.getUUID(), roles);
    }

    @Override
    public TokenRefreshResponse refreshToken(String refreshToken) throws TokenRefreshException {
        var token = refreshTokenService.getByToken(refreshToken);
        var user = token.getAccaunt();
        var jwt = jwtUtils.generateJwtToken(user.getUUID());
        return new TokenRefreshResponse(jwt, refreshToken);
    }
}