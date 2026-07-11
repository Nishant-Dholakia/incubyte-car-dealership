package com.incubyte.cardealership.vehicle.service;

import com.incubyte.cardealership.vehicle.dto.VehicleRequest;
import com.incubyte.cardealership.vehicle.dto.VehicleResponse;
import com.incubyte.cardealership.vehicle.entity.Vehicle;
import com.incubyte.cardealership.vehicle.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleResponse addVehicle(VehicleRequest request) {
        validate(request);

        Vehicle vehicle = Vehicle.builder()
                .make(request.make().trim())
                .model(request.model().trim())
                .category(request.category().trim())
                .price(request.price())
                .quantity(request.quantity())
                .build();

        vehicleRepository.save(vehicle);

        return new VehicleResponse(
                vehicle.getId(),
                vehicle.getMake(),
                vehicle.getModel(),
                vehicle.getCategory(),
                vehicle.getPrice(),
                vehicle.getQuantity()
        );
    }

    private void validate(VehicleRequest request) {
        validateText(request.make(), "Make");
        validateText(request.model(), "Model");
        validateText(request.category(), "Category");

        if (request.price() == null) {
            throw new IllegalArgumentException("Price is required");
        }

        if (request.price().compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Price cannot be negative");
        }

        if (request.quantity() == null) {
            throw new IllegalArgumentException("Quantity is required");
        }

        if (request.quantity() < 0) {
            throw new IllegalArgumentException("Quantity cannot be negative");
        }
    }

    private void validateText(String value, String field) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException(field + " is required");
        }
    }

    public List<VehicleResponse> getAllVehicles() {

        return List.of();
    }
}