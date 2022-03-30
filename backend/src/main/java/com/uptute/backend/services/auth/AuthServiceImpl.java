package com.uptute.backend.services.auth;

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
        user.setUserDetails(
                UserDetails.builder().firstName(request.getFirstName()).lastName(request.getLastName()).build());
        user.getRoles().add(roleRepository.findByName(ERole.ROLE_STUDENT)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found")));
        userRepository.save(user);
        return signin(new SigninRequest(email, password));
    }

    @Override
    public JwtResponse signin(SigninRequest request) {
        var UUID = userRepository.findByEmail(request.getEmail()).get().getUUID();
        var authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(UUID, request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        var jwt = jwtUtils.generateJwtToken(authentication);
        var userDetails = (UserDetailsImpl) authentication.getPrincipal();
        var roles = userDetails.getAuthorities().stream()
                .map(c -> c.getAuthority())
                .collect(Collectors.toList());
        // var refreshToken = refreshTokenService.createRefreshToken();
        var refreshToken = ""; // TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        return new JwtResponse(jwt, refreshToken, userDetails.getUUID(), roles);
        // TODO throw exception!!!!!!?????
    }

    @Override
    public TokenRefreshResponse refreshToken(String refreshToken) throws TokenRefreshException {
        // var token = refreshTokenService.getByToken(refreshToken);
        // refreshTokenService.verifyExpiration(token);
        // var user = token.getAccaunt();
        // var jwt = jwtUtils.generateJwtToken(user);
        // return new TokenRefreshResponse(jwt, refreshToken);
        return null;
    }
}