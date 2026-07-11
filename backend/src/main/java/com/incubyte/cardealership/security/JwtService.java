package com.incubyte.cardealership.security;

import com.incubyte.cardealership.auth.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class JwtService {


    public String generateToken(User user) {
        throw new UnsupportedOperationException();
    }

    public String extractUsername(String token) {
        throw new UnsupportedOperationException();
    }

    public boolean isTokenValid(String token, User user) {
        throw new UnsupportedOperationException();
    }
}