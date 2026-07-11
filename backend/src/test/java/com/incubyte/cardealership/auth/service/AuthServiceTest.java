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

import java.util.Optional;

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


    // REGISTRATION TESTS

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

    @Test
    void shouldThrowExceptionWhenEmailIsBlank() {
        assertThatThrownBy(() -> authService.register("", "password123"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Email is required");

        verify(passwordEncoder, never()).encode(any());
        verify(userRepository, never()).save(any());
    }

    @Test
    void shouldThrowExceptionWhenEmailIsNull() {
        assertThatThrownBy(() -> authService.register(null, "password123"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Email is required");

        verify(passwordEncoder, never()).encode(any());
        verify(userRepository, never()).save(any());
    }

    @Test
    void shouldThrowExceptionWhenEmailIsInvalid() {
        assertThatThrownBy(() -> authService.register("invalid-email", "password123"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Invalid email format");

        verify(passwordEncoder, never()).encode(any());
        verify(userRepository, never()).save(any());
    }

    @Test
    void shouldTrimEmailBeforeSaving() {
        String email = "  john@example.com  ";
        String password = "password123";
        String encodedPassword = "encoded-password";

        when(userRepository.existsByEmail("john@example.com")).thenReturn(false);
        when(passwordEncoder.encode(password)).thenReturn(encodedPassword);

        authService.register(email, password);

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);

        verify(userRepository).save(captor.capture());

        assertThat(captor.getValue().getEmail())
                .isEqualTo("john@example.com");
    }

    @Test
    void shouldThrowExceptionWhenPasswordIsBlank() {
        String email = "john@example.com";

        assertThatThrownBy(() -> authService.register(email, ""))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Password is required");

        verify(passwordEncoder, never()).encode(any());
        verify(userRepository, never()).save(any());
    }

    @Test
    void shouldThrowExceptionWhenPasswordIsNull() {
        String email = "john@example.com";

        assertThatThrownBy(() -> authService.register(email, null))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Password is required");

        verify(passwordEncoder, never()).encode(any());
        verify(userRepository, never()).save(any());
    }

    @Test
    void shouldThrowExceptionWhenPasswordIsTooShort() {
        String email = "john@example.com";

        assertThatThrownBy(() -> authService.register(email, "1234567"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Password must be at least 8 characters");

        verify(passwordEncoder, never()).encode(any());
        verify(userRepository, never()).save(any());
    }

    //  LOGIN TESTS

    @Test
    void shouldLoginSuccessfully() {
        // Arrange
        String email = "john@example.com";
        String rawPassword = "password123";
        String encodedPassword = "encoded-password";

        User user = User.builder()
                .email(email)
                .password(encodedPassword)
                .build();

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches(rawPassword, encodedPassword))
                .thenReturn(true);

        // Act
        User loggedInUser = authService.login(email, rawPassword);

        // Assert
        assertThat(loggedInUser).isEqualTo(user);

        verify(userRepository).findByEmail(email);
        verify(passwordEncoder).matches(rawPassword, encodedPassword);
    }

    @Test
    void shouldThrowExceptionWhenUserDoesNotExist() {
        String email = "john@example.com";
        String password = "password123";

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.login(email, password))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Invalid email or password");

        verify(passwordEncoder, never()).matches(any(), any());
    }

    @Test
    void shouldThrowExceptionWhenPasswordIsIncorrect() {
        String email = "john@example.com";
        String rawPassword = "password123";
        String encodedPassword = "encoded-password";

        User user = User.builder()
                .email(email)
                .password(encodedPassword)
                .build();

        when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(user));

        when(passwordEncoder.matches(rawPassword, encodedPassword))
                .thenReturn(false);

        assertThatThrownBy(() -> authService.login(email, rawPassword))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Invalid email or password");
    }

    @Test
    void shouldThrowExceptionWhenLoginEmailIsBlank() {
        assertThatThrownBy(() -> authService.login("", "password123"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Email is required");

        verify(userRepository, never()).findByEmail(any());
    }

    @Test
    void shouldThrowExceptionWhenLoginEmailIsNull() {
        assertThatThrownBy(() -> authService.login(null, "password123"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Email is required");

        verify(userRepository, never()).findByEmail(any());
    }

    @Test
    void shouldThrowExceptionWhenLoginEmailIsInvalid() {
        assertThatThrownBy(() -> authService.login("invalid-email", "password123"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Invalid email format");

        verify(userRepository, never()).findByEmail(any());
    }

    @Test
    void shouldThrowExceptionWhenLoginPasswordIsBlank() {
        assertThatThrownBy(() -> authService.login("john@example.com", ""))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Password is required");

        verify(userRepository, never()).findByEmail(any());
    }

    @Test
    void shouldThrowExceptionWhenLoginPasswordIsNull() {
        assertThatThrownBy(() -> authService.login("john@example.com", null))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Password is required");

        verify(userRepository, never()).findByEmail(any());
    }


}