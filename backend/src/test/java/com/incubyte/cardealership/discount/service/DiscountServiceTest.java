package com.incubyte.cardealership.discount.service;

import com.incubyte.cardealership.discount.dto.DiscountRequest;
import com.incubyte.cardealership.discount.dto.DiscountResponse;
import com.incubyte.cardealership.discount.entity.Discount;
import com.incubyte.cardealership.discount.repository.DiscountRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DiscountServiceTest {

    @Mock
    private DiscountRepository discountRepository;

    @InjectMocks
    private DiscountService discountService;

    private LocalDateTime now;

    @BeforeEach
    void setUp() {
        now = LocalDateTime.of(2026, 7, 14, 12, 0);
    }

    @Test
    void shouldCreateDiscountSuccessfully() {
        DiscountRequest request = new DiscountRequest(
                1L,
                null,
                15.0,
                now.plusDays(1),
                now.plusDays(2)
        );

        Discount discount = Discount.builder()
                .id(10L)
                .vehicleId(1L)
                .discountRate(15.0)
                .startDate(now.plusDays(1))
                .endDate(now.plusDays(2))
                .build();

        when(discountRepository.save(any(Discount.class))).thenReturn(discount);

        DiscountResponse response = discountService.createDiscount(request);

        assertNotNull(response);
        assertEquals(10L, response.id());
        assertEquals(1L, response.vehicleId());
        assertNull(response.make());
        assertEquals(15.0, response.discountRate());
        verify(discountRepository, times(1)).save(any(Discount.class));
    }

    @Test
    void shouldThrowExceptionWhenNeitherVehicleIdNorMakeIsProvided() {
        DiscountRequest request = new DiscountRequest(
                null,
                null,
                10.0,
                now.plusDays(1),
                now.plusDays(2)
        );

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
                discountService.createDiscount(request)
        );

        assertEquals("Either Vehicle ID or Make must be provided as a target for the discount", exception.getMessage());
    }

    @Test
    void shouldThrowExceptionWhenStartDateIsAfterEndDate() {
        DiscountRequest request = new DiscountRequest(
                1L,
                null,
                10.0,
                now.plusDays(2),
                now.plusDays(1)
        );

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
                discountService.createDiscount(request)
        );

        assertEquals("Start date must be before end date", exception.getMessage());
    }

    @Test
    void shouldReturnAllDiscounts() {
        Discount discount = Discount.builder()
                .id(1L)
                .make("Ford")
                .discountRate(10.0)
                .startDate(now)
                .endDate(now.plusDays(1))
                .build();

        when(discountRepository.findAll()).thenReturn(List.of(discount));

        List<DiscountResponse> results = discountService.getAllDiscounts();

        assertEquals(1, results.size());
        assertEquals("Ford", results.getFirst().make());
    }

    @Test
    void shouldDeleteDiscount() {
        when(discountRepository.existsById(1L)).thenReturn(true);
        doNothing().when(discountRepository).deleteById(1L);

        assertDoesNotThrow(() -> discountService.deleteDiscount(1L));

        verify(discountRepository, times(1)).deleteById(1L);
    }

    @Test
    void shouldThrowExceptionWhenDeletingNonExistentDiscount() {
        when(discountRepository.existsById(1L)).thenReturn(false);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
                discountService.deleteDiscount(1L)
        );

        assertEquals("Discount with ID 1 does not exist", exception.getMessage());
    }

    @Test
    void shouldReturnZeroDiscountRateWhenNoActiveDiscountsMatch() {
        when(discountRepository.findActiveDiscounts(1L, "Toyota", now)).thenReturn(Collections.emptyList());

        Double rate = discountService.getActiveDiscountRate(1L, "Toyota", now);

        assertEquals(0.0, rate);
    }

    @Test
    void shouldReturnHighestDiscountRateWhenMultipleActiveDiscountsMatch() {
        Discount d1 = Discount.builder().discountRate(10.0).build();
        Discount d2 = Discount.builder().discountRate(25.0).build();
        Discount d3 = Discount.builder().discountRate(15.0).build();

        when(discountRepository.findActiveDiscounts(1L, "Toyota", now)).thenReturn(List.of(d1, d2, d3));

        Double rate = discountService.getActiveDiscountRate(1L, "Toyota", now);

        assertEquals(25.0, rate);
    }
}
