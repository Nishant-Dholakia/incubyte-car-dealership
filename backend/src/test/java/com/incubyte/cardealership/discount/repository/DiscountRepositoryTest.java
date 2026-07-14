package com.incubyte.cardealership.discount.repository;

import com.incubyte.cardealership.discount.entity.Discount;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class DiscountRepositoryTest {

    @Autowired
    private DiscountRepository discountRepository;

    private final LocalDateTime now = LocalDateTime.of(2026, 7, 14, 12, 0);

    @BeforeEach
    void setUp() {
        discountRepository.deleteAll();

        // 1. Active specific vehicle discount
        discountRepository.save(Discount.builder()
                .vehicleId(1L)
                .discountRate(10.0)
                .startDate(now.minusDays(1))
                .endDate(now.plusDays(1))
                .build());

        // 2. Active make discount (Toyota)
        discountRepository.save(Discount.builder()
                .make("Toyota")
                .discountRate(15.0)
                .startDate(now.minusDays(2))
                .endDate(now.plusDays(2))
                .build());

        // 3. Expired discount
        discountRepository.save(Discount.builder()
                .vehicleId(1L)
                .discountRate(20.0)
                .startDate(now.minusDays(5))
                .endDate(now.minusDays(1))
                .build());

        // 4. Future discount
        discountRepository.save(Discount.builder()
                .make("Honda")
                .discountRate(5.0)
                .startDate(now.plusDays(1))
                .endDate(now.plusDays(5))
                .build());
    }

    @Test
    void shouldFindActiveDiscountByVehicleId() {
        List<Discount> activeDiscounts = discountRepository.findActiveDiscounts(1L, "Ford", now);
        assertEquals(1, activeDiscounts.size());
        assertEquals(10.0, activeDiscounts.getFirst().getDiscountRate());
    }

    @Test
    void shouldFindActiveDiscountByMakeCaseInsensitively() {
        List<Discount> activeDiscounts = discountRepository.findActiveDiscounts(99L, "toyota", now);
        assertEquals(1, activeDiscounts.size());
        assertEquals(15.0, activeDiscounts.getFirst().getDiscountRate());
    }

    @Test
    void shouldFindMultipleActiveDiscountsIfBothVehicleAndMakeMatch() {
        List<Discount> activeDiscounts = discountRepository.findActiveDiscounts(1L, "Toyota", now);
        assertEquals(2, activeDiscounts.size());
    }

    @Test
    void shouldReturnEmptyListIfNoActiveDiscountsMatch() {
        List<Discount> activeDiscounts = discountRepository.findActiveDiscounts(2L, "Honda", now);
        assertTrue(activeDiscounts.isEmpty());
    }
}
