package com.incubyte.cardealership.auth.service;

import com.incubyte.cardealership.auth.entity.User;
import com.incubyte.cardealership.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class JwtServiceTest {

    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        jwtService = new JwtService(
                "12345678901234567890123456789012", // 32+ chars
                3600000L
        );
    }

    @Test
    void shouldGenerateToken() {

        User user = User.builder()
                .email("john@example.com")
                .build();

        String token = jwtService.generateToken(user);

        assertThat(token)
                .isNotNull()
                .isNotBlank();
    }

    @Test
    void shouldExtractUsernameFromToken() {

        User user = User.builder()
                .email("john@example.com")
                .build();

        String token = jwtService.generateToken(user);

        String username = jwtService.extractUsername(token);

        assertThat(username).isEqualTo("john@example.com");
    }

    @Test
    void shouldValidateGeneratedToken() {

        User user = User.builder()
                .email("john@example.com")
                .build();

        String token = jwtService.generateToken(user);

        assertThat(jwtService.isTokenValid(token, user))
                .isTrue();
    }

    @Test
    void shouldRejectTokenForDifferentUser() {

        User user = User.builder()
                .email("john@example.com")
                .build();

        User anotherUser = User.builder()
                .email("alice@example.com")
                .build();

        String token = jwtService.generateToken(user);

        assertThat(jwtService.isTokenValid(token, anotherUser))
                .isFalse();
    }

    @Test
    void shouldRejectInvalidToken() {

        assertThat(jwtService.isTokenValid("invalid-token",
                User.builder()
                        .email("john@example.com")
                        .build()))
                .isFalse();
    }


}
