package com.uptute.backend.auth.jwt;

import java.util.Date;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.uptute.backend.account.entities.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtAuthenticationProvider implements AuthenticationProvider {

    @Value("${uptute.app.jwtSecret}")
    private String jwtSecret;

    @Value("${uptute.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    @Override // FIXME for no reason iterates 2 times per request //mb onCompleated???
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        var bearerAuth = (BearerTokenAuthenticationToken) authentication;
        var jwt = parseJwt(bearerAuth.getToken());
        bearerAuth.setTokenClaims(jwt.getBody());
        bearerAuth.setAuthenticated(true);
        SecurityContextHolder.getContext().setAuthentication(bearerAuth);
        return bearerAuth;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return BearerTokenAuthenticationToken.class.isAssignableFrom(authentication);
    }

    public String generateJwtToken(User user) {
        var now = new Date();
        var exprirationTime = new Date(now.getTime() + jwtExpirationMs);//FIXME!!!!!
        var claims = new HashMap<String, Object>();
        claims.put("rls", user.getRoles().stream().map(r -> r.getName().toString()).toList());
        return Jwts.builder()
                .setSubject(user.getUUID())
                .setIssuedAt(now)
                .setExpiration(exprirationTime)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .addClaims(claims)
                .compact();
    }

    private Jws<Claims> parseJwt(String authToken) throws BadCredentialsException {
        try {
            return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
        } catch (SignatureException e) {
            log.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            log.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty: {}", e.getMessage());
        }
        throw new BadCredentialsException("token is not valid");
    }
}