package com.incubyte.cardealership.discount.dto;

import java.time.LocalDateTime;

public record DiscountResponse(
        Long id,
        Long vehicleId,
        String make,
        Double discountRate,
        LocalDateTime startDate,
        LocalDateTime endDate
) {
}
