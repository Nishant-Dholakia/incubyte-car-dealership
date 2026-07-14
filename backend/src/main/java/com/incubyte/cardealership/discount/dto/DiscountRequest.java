package com.incubyte.cardealership.discount.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

public record DiscountRequest(
        Long vehicleId,

        String make,

        @NotNull(message = "Discount rate is required")
        @Min(value = 0, message = "Discount rate must be positive")
        @Max(value = 100, message = "Discount rate cannot exceed 100")
        Double discountRate,

        @NotNull(message = "Start date is required")
        LocalDateTime startDate,

        @NotNull(message = "End date is required")
        LocalDateTime endDate
) {
}
