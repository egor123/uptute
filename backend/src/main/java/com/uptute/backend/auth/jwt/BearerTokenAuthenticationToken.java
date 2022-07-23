package com.uptute.backend.auth.jwt;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import io.jsonwebtoken.Claims;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@RequiredArgsConstructor
@ToString
public class BearerTokenAuthenticationToken implements Authentication {

    @NonNull
    @Getter
    protected String token;
    protected Claims claims;
    protected List<GrantedAuthority> authorities = new ArrayList<>();
    protected boolean authenticated;

    @Override
    public String getName() {
        if (claims == null)
            return null;
        return claims.getSubject();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public Object getCredentials() {
        return "";// XXX
    }

    @Override
    public Object getDetails() {
        if (claims == null)
            return null;
        return claims.toString();
    }

    @Override
    public Object getPrincipal() {
        if (claims == null)
            return null;
        return claims.getSubject();
    }

    @Override
    public boolean isAuthenticated() {
        return authenticated;
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
        authenticated = isAuthenticated;
    }

    public void setTokenClaims(Claims claims) {
        this.claims = claims;
        var roles = claims.get("rls", Collection.class);
        authorities = new ArrayList<>();// TODO check for weird beh (maybe)
        if (roles != null)
            for (var role : roles)
                authorities.add(new SimpleGrantedAuthority(role.toString()));// FIXME fetch enums from repo
    }
}