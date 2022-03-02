package com.uptute.backend.security;

import com.uptute.backend.security.jwt.AuthEntryPointJwt;
import com.uptute.backend.security.jwt.AuthTokenFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	// @Autowired
	// private AuthEntryPointJwt unauthorizedHandler;

	// @Bean
	// public AuthTokenFilter authenticationJwtTokenFilter() {
	// return new AuthTokenFilter();
	// }

	@Override
	protected void configure(HttpSecurity http) throws Exception{
	http.cors().and().csrf().disable();
	// .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
	// .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
	// .authorizeRequests().antMatchers("/api/auth/**").permitAll()
	// // .antMatchers("/api/test/**").permitAll()
	// .anyRequest().authenticated();

	// // http.addFilterBefore(authenticationJwtTokenFilter(),
	// UsernamePasswordAuthenticationFilter.class);
	}
}
