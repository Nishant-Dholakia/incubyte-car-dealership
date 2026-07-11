package com.incubyte.cardealership.auth.service;

import com.incubyte.cardealership.auth.entity.User;
import com.incubyte.cardealership.auth.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AuthService authService;

    @Test
    void shouldRegisterUserSuccessfully() {
        // Arrange
        String email = "new.user@example.com";
        String rawPassword = "password123";
        String encodedPassword = "encoded-password";

        when(passwordEncoder.encode(rawPassword))
                .thenReturn(encodedPassword);

        // Act
        authService.register(email, rawPassword);

        // Assert
        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);

        verify(userRepository).save(userCaptor.capture());

        User savedUser = userCaptor.getValue();

        assertThat(savedUser.getEmail()).isEqualTo(email);
        assertThat(savedUser.getPassword()).isEqualTo(encodedPassword);
    }

    @Test
    void shouldThrowExceptionWhenEmailAlreadyExists() {
        String email = "existing@example.com";
        String password = "password123";

        when(userRepository.existsByEmail(email)).thenReturn(true);

        assertThatThrownBy(() -> authService.register(email, password))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Email already exists");

        verify(userRepository, never()).save(any());
        verify(passwordEncoder, never()).encode(any());
    }

}