package com.uptute.backend.security.jwt;

import java.sql.Date;
import java.util.stream.Collectors;

import com.uptute.backend.entities.Account;
import com.uptute.backend.entities.Role;
import com.uptute.backend.enums.ERole;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${uptute.app.jwtSecret}")
    private String jwtSecret;

    @Value("${uptute.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String generateToken(Account accaunt) {
        Long now = System.currentTimeMillis();
        return Jwts.builder().setSubject(accaunt.getUUID())
                .claim("authorities",
                        accaunt.getRoles().stream().map(Role::getName).map(ERole::toString)
                                .collect(Collectors.toList()))
                .setIssuedAt(new Date(now + jwtExpirationMs)).signWith(SignatureAlgorithm.HS512, jwtSecret.getBytes())
                .compact();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }
    // public void validateToken(String token) {
    // try {
    // Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
    // } catch (SignatureException e) {
    // throw new JwtException(token, "Invalid JWT signature: " + e.getMessage());
    // } catch (MalformedJwtException e) {
    // throw new JwtException(token, "Invalid JWT token: " + e.getMessage());
    // } catch (ExpiredJwtException e) {
    // throw new JwtException(token, "JWT token is expired: " + e.getMessage());
    // } catch (UnsupportedJwtException e) {
    // throw new JwtException(token, "JWT token is unsupported: " + e.getMessage());
    // } catch (IllegalArgumentException e) {
    // throw new JwtException(token, "JWT claims string is empty: " +
    // e.getMessage());
    // }
    // }
}
