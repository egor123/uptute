package com.uptute.backend.auth.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.uptute.backend.auth.jwt.BearerTokenAuthenticationToken;
import com.uptute.backend.auth.jwt.JwtAuthenticationProvider;

import net.devh.boot.grpc.server.security.authentication.BearerAuthenticationReader;
import net.devh.boot.grpc.server.security.authentication.CompositeGrpcAuthenticationReader;
import net.devh.boot.grpc.server.security.authentication.GrpcAuthenticationReader;

@Configuration
// @EnableWebSecurity //XXX:????????????????
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationProvider jwtAuthenticationProvider;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager() {
        final List<AuthenticationProvider> providers = new ArrayList<>();
        providers.add(jwtAuthenticationProvider);
        return new ProviderManager(providers);
    }
    
    @Bean
    GrpcAuthenticationReader authenticationReader() {
        final List<GrpcAuthenticationReader> readers = new ArrayList<>();
        readers.add(new BearerAuthenticationReader(accessToken -> new BearerTokenAuthenticationToken(accessToken)));
        return new CompositeGrpcAuthenticationReader(readers);
    }

    // @Autowired
    // UserDetailsServiceImpl accountDetailsService;

    // @Autowired
    // private AuthEntryPointJwt unauthorizedHandler;

    // @Bean
    // public AuthTokenFilter authenticationJwtTokenFilter() {
    // return new AuthTokenFilter();
    // }

    // @Override
    // public void configure(AuthenticationManagerBuilder
    // authenticationManagerBuilder) throws Exception {
    // authenticationManagerBuilder.userDetailsService(accountDetailsService).passwordEncoder(passwordEncoder());
    // }

    // @Bean
    // @Override
    // public AuthenticationManager authenticationManagerBean() throws Exception {
    // return super.authenticationManagerBean();
    // }

    // @Bean
    // public PasswordEncoder passwordEncoder() {
    //     return new BCryptPasswordEncoder();
    // }

    // @Override
    // protected void configure(HttpSecurity http) throws Exception {
    // http.cors().and().csrf().disable()
    // .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
    // .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
    // .authorizeRequests()
    // .antMatchers("/auth/**").permitAll()
    // //.antMatchers("/api/test/**").permitAll()
    // .anyRequest().authenticated();
    // http.addFilterBefore(authenticationJwtTokenFilter(),
    // UsernamePasswordAuthenticationFilter.class);
    // }
}
