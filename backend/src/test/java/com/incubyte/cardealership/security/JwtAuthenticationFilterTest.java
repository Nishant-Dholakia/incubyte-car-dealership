package com.incubyte.cardealership.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.io.IOException;
import java.util.Collections;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class JwtAuthenticationFilterTest {

    @Mock
    private JwtService jwtService;

    @Mock
    private UserDetailsService userDetailsService;

    @InjectMocks
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private FilterChain filterChain;

    @AfterEach
    void tearDown() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void shouldContinueFilterChainWhenAuthorizationHeaderIsMissing()
            throws ServletException, IOException {

        when(request.getHeader(HttpHeaders.AUTHORIZATION))
                .thenReturn(null);

        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        verify(filterChain).doFilter(request, response);
        verifyNoInteractions(jwtService);
        verifyNoInteractions(userDetailsService);
    }

    @Test
    void shouldContinueFilterChainWhenAuthorizationHeaderDoesNotStartWithBearer()
            throws ServletException, IOException {

        when(request.getHeader(HttpHeaders.AUTHORIZATION))
                .thenReturn("Basic abc123");

        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        verify(filterChain).doFilter(request, response);
        verifyNoInteractions(jwtService);
        verifyNoInteractions(userDetailsService);
    }

    @Test
    void shouldAuthenticateUserWhenJwtIsValid()
            throws ServletException, IOException {

        String token = "jwt-token";
        String username = "john@example.com";

        UserDetails userDetails =
                org.springframework.security.core.userdetails.User
                        .withUsername(username)
                        .password("password")
                        .authorities(Collections.emptyList())
                        .build();

        when(request.getHeader(HttpHeaders.AUTHORIZATION))
                .thenReturn("Bearer " + token);

        when(jwtService.extractUsername(token))
                .thenReturn(username);

        when(userDetailsService.loadUserByUsername(username))
                .thenReturn(userDetails);

        when(jwtService.isTokenValid(token, userDetails))
                .thenReturn(true);

        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        assertThat(authentication).isNotNull();
        assertThat(authentication.getName()).isEqualTo(username);

        verify(filterChain).doFilter(request, response);
    }

    @Test
    void shouldNotAuthenticateUserWhenJwtIsInvalid()
            throws ServletException, IOException {

        String token = "jwt-token";
        String username = "john@example.com";

        UserDetails userDetails =
                org.springframework.security.core.userdetails.User
                        .withUsername(username)
                        .password("password")
                        .authorities(Collections.emptyList())
                        .build();

        when(request.getHeader(HttpHeaders.AUTHORIZATION))
                .thenReturn("Bearer " + token);

        when(jwtService.extractUsername(token))
                .thenReturn(username);

        when(userDetailsService.loadUserByUsername(username))
                .thenReturn(userDetails);

        when(jwtService.isTokenValid(token, userDetails))
                .thenReturn(false);

        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        assertThat(SecurityContextHolder.getContext().getAuthentication())
                .isNull();

        verify(filterChain).doFilter(request, response);
    }

    @Test
    void shouldNotAuthenticateUserWhenAuthenticationAlreadyExists()
            throws ServletException, IOException {

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(
                        "existing-user",
                        null,
                        Collections.emptyList()
                )
        );

        when(request.getHeader(HttpHeaders.AUTHORIZATION))
                .thenReturn("Bearer jwt-token");

        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        verify(userDetailsService, never()).loadUserByUsername(any());
        verify(filterChain).doFilter(request, response);
    }
}