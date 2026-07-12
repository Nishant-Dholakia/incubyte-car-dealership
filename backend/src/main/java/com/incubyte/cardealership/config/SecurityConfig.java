package com.incubyte.cardealership.config;

import com.incubyte.cardealership.security.JwtAuthenticationFilter;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(
                                "/api/auth/**"
                        ).permitAll()

                        .requestMatchers(HttpMethod.GET, "/api/health")
                        .permitAll()

                        .requestMatchers(HttpMethod.GET, "/api/vehicles/**")
                        .hasAnyRole("USER", "ADMIN")

                        .requestMatchers(HttpMethod.POST, "/api/vehicles/*/purchase")
                        .hasAnyRole("USER", "ADMIN")

                        .requestMatchers(HttpMethod.POST, "/api/vehicles")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.PUT, "/api/vehicles/**")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.DELETE, "/api/vehicles/**")
                        .hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "/api/vehicles/*/restock")
                        .hasRole("ADMIN")

                        .anyRequest().authenticated()
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
