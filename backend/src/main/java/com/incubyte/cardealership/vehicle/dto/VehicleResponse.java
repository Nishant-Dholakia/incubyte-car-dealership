package com.incubyte.cardealership.vehicle.dto;

import java.math.BigDecimal;

public record VehicleResponse(
        Long id,
        String make,
        String model,
        String category,
        BigDecimal price,
        BigDecimal discountedPrice,
        Double activeDiscountRate,
        Integer quantity
) {
    public VehicleResponse(Long id, String make, String model, String category, BigDecimal price, Integer quantity) {
        this(id, make, model, category, price, price, 0.0, quantity);
    }
}