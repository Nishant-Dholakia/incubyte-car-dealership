//package com.incubyte.cardealership.auth.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.incubyte.cardealership.auth.dto.RegisterRequest;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//
//import static org.springframework.mock.http.server.reactive.MockServerHttpRequest.post;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@WebMvcTest(AuthController.class)
//class AuthControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private AuthService authService;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    @Test
//    void shouldReturn201WhenUserRegistersSuccessfully() throws Exception {
//
//        RegisterRequest request =
//                new RegisterRequest("john@example.com", "password123");
//
//        mockMvc.perform(post("/api/auth/register")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(request)))
//                .andExpect(status().isCreated());
//    }
//}
