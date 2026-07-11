package com.incubyte.cardealership.auth.repository;

import com.incubyte.cardealership.auth.entity.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository {

    User save(User user);

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);
}
