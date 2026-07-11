package com.incubyte.cardealership.auth.entity;


import lombok.*;

@Getter
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    private String email;
    private String password;
}