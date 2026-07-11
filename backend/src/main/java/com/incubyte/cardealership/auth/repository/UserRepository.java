package com.incubyte.cardealership.auth.repository;

import com.incubyte.cardealership.auth.entity.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository {

    User save(User user);

    boolean existsByEmail(String email);
}
