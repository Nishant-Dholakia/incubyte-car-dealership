package com.incubyte.cardealership.vehicle.dto;

import java.math.BigDecimal;

public record VehicleSearchRequest(
        String make,
        String model,
        String category,
        BigDecimal minPrice,
        BigDecimal maxPrice
) {}