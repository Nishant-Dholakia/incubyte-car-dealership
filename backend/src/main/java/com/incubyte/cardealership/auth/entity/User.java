package com.incubyte.cardealership.auth.entity;


import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class User {

    private String email;
    private String password;
}