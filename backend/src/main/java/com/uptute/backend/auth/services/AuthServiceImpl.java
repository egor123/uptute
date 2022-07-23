// package com.uptute.backend.auth.services;

// import java.util.NoSuchElementException;
// import java.util.stream.Collectors;


// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.AuthenticationException;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// import com.uptute.backend.auth.entities.User;
// import com.uptute.backend.auth.exceptions.EmailIsAlreadyTakenException;
// import com.uptute.backend.auth.exceptions.TokenRefreshException;
// import com.uptute.backend.auth.jwt.JwtUtils;
// import com.uptute.backend.grpc.auth.JwtResponse;
// import com.uptute.backend.grpc.auth.ShortJwtResponse;
// import com.uptute.backend.grpc.auth.SigninRequest;
// import com.uptute.backend.grpc.auth.SignupRequest;

// @Service
// public class AuthServiceImpl implements AuthService {

//     @Autowired
//     private AuthenticationManager authManager;

//     @Autowired
//     private PasswordEncoder encoder;

//     @Autowired
//     private JwtUtils jwtUtils;

//     @Autowired
//     private RefreshTokenService refreshTokenService;

//     @Autowired
//     private UserRepository userRepository;

//     @Override
//     public JwtResponse signup(SignupRequest request) throws EmailIsAlreadyTakenException {
//         var email = request.getEmail();
//         var password = request.getPassword();
//         if (userRepository.existsByEmail(email))
//             throw new EmailIsAlreadyTakenException(email);
//         var user = new User(email, encoder.encode(password));
//         userRepository.save(user);
//         try {
//             return signin(new SigninRequest(email, password));
//         } catch (NoSuchElementException | AuthenticationException e) {
//             return null;
//         }
//     }

//     @Override
//     public JwtResponse signin(SigninRequest request) throws NoSuchElementException, AuthenticationException {
//         var uuid = userRepository.findByEmail(request.getEmail()).get().getUUID();
//         var auth = authManager.authenticate(new UsernamePasswordAuthenticationToken(uuid, request.getPassword()));
//         SecurityContextHolder.getContext().setAuthentication(auth);
//         var userDetails = (UserDetailsImpl) auth.getPrincipal();
//         var jwt = jwtUtils.generateJwtToken(userDetails.getUUID());
//         var roles = userDetails.getAuthorities().stream()
//                 .map(c -> c.getAuthority())
//                 .collect(Collectors.toList());
//         var refreshToken = refreshTokenService.createRefreshToken(uuid);
//         return new JwtResponse(jwt, refreshToken, userDetails.getUUID(), roles);
//     }

//     @Override
//     public JwtResponse refreshToken(String refreshToken) throws TokenRefreshException {
//         var token = refreshTokenService.getByToken(refreshToken);
//         var user = token.getAccaunt();
//         var jwt = jwtUtils.generateJwtToken(user.getUUID());
//         var roles = user.getRoles().stream().map(r -> r.getName().toString()).collect(Collectors.toList());
//         return new JwtResponse(jwt, refreshToken, user.getUUID(), roles);
//     }

//     @Override
//     public ShortJwtResponse authUser(User user) {
//         var jwt = jwtUtils.generateJwtToken(user.getUUID());
//         var roles = user.getRoles().stream().map(r -> r.getName().toString()).collect(Collectors.toList());
//         return new ShortJwtResponse(jwt, user.getUUID(), roles);
//     }
// }