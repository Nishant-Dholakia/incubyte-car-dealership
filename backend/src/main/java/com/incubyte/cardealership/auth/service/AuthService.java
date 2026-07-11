package com.incubyte.cardealership.auth.service;

import com.incubyte.cardealership.auth.entity.User;
import com.incubyte.cardealership.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void register(String email, String password) {

        if(userRepository.existsByEmail(email)){
            throw new IllegalArgumentException("Email already exists");
        }
        String encodedPassword = passwordEncoder.encode(password);

        User user = new User();
        user.setEmail(email);
        user.setPassword(encodedPassword);

        userRepository.save(user);
    }
}