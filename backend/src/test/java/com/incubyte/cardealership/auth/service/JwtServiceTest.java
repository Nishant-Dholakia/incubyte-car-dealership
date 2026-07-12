package com.incubyte.cardealership.auth.service;

import com.incubyte.cardealership.auth.entity.User;
import com.incubyte.cardealership.auth.enums.Role;
import com.incubyte.cardealership.security.JwtProperties;
import com.incubyte.cardealership.security.JwtService;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Base64;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class JwtServiceTest {

    private JwtService jwtService;

    private static final String TEST_SECRET =
            Base64.getEncoder().encodeToString(
                    Keys.secretKeyFor(SignatureAlgorithm.HS256).getEncoded()
            );

    @BeforeEach
    void setUp() {
        JwtProperties properties =
                new JwtProperties(TEST_SECRET, 3600000L);

        jwtService = new JwtService(properties);
    }

    @Test
    void shouldGenerateToken() {

        User user = User.builder()
                .email("john@example.com")
                .role(Role.USER)
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
                .role(Role.USER)
                .build();

        String token = jwtService.generateToken(user);

        String username = jwtService.extractUsername(token);

        assertThat(username).isEqualTo("john@example.com");
    }

    @Test
    void shouldExtractRoleFromToken() {

        User user = User.builder()
                .email("admin@dealer.com")
                .role(Role.ADMIN)
                .build();

        String token = jwtService.generateToken(user);

        String role = jwtService.extractRole(token);

        assertThat(role).isEqualTo("ADMIN");
    }

    @Test
    void shouldValidateGeneratedToken() {

        User user = User.builder()
                .email("john@example.com")
                .role(Role.USER)
                .build();

        String token = jwtService.generateToken(user);

        assertThat(jwtService.isTokenValid(token, user))
                .isTrue();
    }

    @Test
    void shouldRejectTokenForDifferentUser() {

        User user = User.builder()
                .email("john@example.com")
                .role(Role.USER)
                .build();

        User anotherUser = User.builder()
                .email("alice@example.com")
                .role(Role.USER)
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

    @Test
    void shouldRejectExpiredToken() {
        JwtProperties expiredProperties = new JwtProperties(TEST_SECRET, -1000L);
        JwtService expiredJwtService = new JwtService(expiredProperties);

        User user = User.builder()
                .email("john@example.com")
                .role(Role.USER)
                .build();

        String token = expiredJwtService.generateToken(user);

        assertThat(expiredJwtService.isTokenValid(token, user))
                .isFalse();
    }

    @Test
    void shouldRejectTamperedToken() {
        User user = User.builder()
                .email("john@example.com")
                .role(Role.USER)
                .build();

        String token = jwtService.generateToken(user);
        String tamperedToken = token.substring(0, token.length() - 1) + 
                (token.charAt(token.length() - 1) == 'a' ? 'b' : 'a');

        assertThat(jwtService.isTokenValid(tamperedToken, user))
                .isFalse();
    }
}
