package com.incubyte.cardealership.discount.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.incubyte.cardealership.config.SecurityConfig;
import com.incubyte.cardealership.discount.dto.DiscountRequest;
import com.incubyte.cardealership.discount.dto.DiscountResponse;
import com.incubyte.cardealership.discount.service.DiscountService;
import com.incubyte.cardealership.security.JwtAuthenticationFilter;
import com.incubyte.cardealership.security.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(DiscountController.class)
@Import({SecurityConfig.class, JwtAuthenticationFilter.class})
class DiscountControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private DiscountService discountService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private AuthenticationProvider authenticationProvider;

    private final LocalDateTime now = LocalDateTime.of(2026, 7, 14, 12, 0);

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldCreateDiscountWhenUserIsAdmin() throws Exception {
        DiscountRequest request = new DiscountRequest(
                1L, null, 10.0, now, now.plusDays(1)
        );

        DiscountResponse response = new DiscountResponse(
                1L, 1L, null, 10.0, now, now.plusDays(1)
        );

        when(discountService.createDiscount(any(DiscountRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/discounts")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.discountRate").value(10.0));
    }

    @Test
    @WithMockUser(roles = "USER")
    void shouldReturnForbiddenWhenUserIsStandardUser() throws Exception {
        DiscountRequest request = new DiscountRequest(
                1L, null, 10.0, now, now.plusDays(1)
        );

        mockMvc.perform(post("/api/discounts")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldReturnUnauthorizedWhenUserIsAnonymous() throws Exception {
        DiscountRequest request = new DiscountRequest(
                1L, null, 10.0, now, now.plusDays(1)
        );

        mockMvc.perform(post("/api/discounts")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldReturnBadRequestWhenDiscountRateIsInvalid() throws Exception {
        DiscountRequest request = new DiscountRequest(
                1L, null, -5.0, now, now.plusDays(1)
        );

        mockMvc.perform(post("/api/discounts")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldGetAllDiscounts() throws Exception {
        DiscountResponse response = new DiscountResponse(
                1L, null, "Toyota", 15.0, now, now.plusDays(2)
        );

        when(discountService.getAllDiscounts()).thenReturn(List.of(response));

        mockMvc.perform(get("/api/discounts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].make").value("Toyota"))
                .andExpect(jsonPath("$[0].discountRate").value(15.0));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void shouldDeleteDiscount() throws Exception {
        doNothing().when(discountService).deleteDiscount(1L);

        mockMvc.perform(delete("/api/discounts/1")
                        .with(csrf()))
                .andExpect(status().isNoContent());

        verify(discountService, times(1)).deleteDiscount(1L);
    }
}
