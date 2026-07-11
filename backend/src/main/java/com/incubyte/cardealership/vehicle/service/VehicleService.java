package com.incubyte.cardealership.vehicle.service;

import com.incubyte.cardealership.exception.VehicleNotFoundException;
import com.incubyte.cardealership.vehicle.dto.RestockRequest;
import com.incubyte.cardealership.vehicle.dto.VehicleRequest;
import com.incubyte.cardealership.vehicle.dto.VehicleResponse;
import com.incubyte.cardealership.vehicle.dto.VehicleSearchRequest;
import com.incubyte.cardealership.vehicle.entity.Vehicle;
import com.incubyte.cardealership.vehicle.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;


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
        return vehicleRepository.findAll()
                .stream()
                .map(vehicle -> new VehicleResponse(
                        vehicle.getId(),
                        vehicle.getMake(),
                        vehicle.getModel(),
                        vehicle.getCategory(),
                        vehicle.getPrice(),
                        vehicle.getQuantity()
                ))
                .toList();
    }

    public List<VehicleResponse> searchVehicles(VehicleSearchRequest request) {
        return vehicleRepository.searchVehicles(
                        request.make(),
                        request.model(),
                        request.category(),
                        request.minPrice(),
                        request.maxPrice()
                )
                .stream()
                .map(this::toVehicleResponse)
                .toList();
    }

    private VehicleResponse toVehicleResponse(Vehicle vehicle) {
        return new VehicleResponse(
                vehicle.getId(),
                vehicle.getMake(),
                vehicle.getModel(),
                vehicle.getCategory(),
                vehicle.getPrice(),
                vehicle.getQuantity()
        );
    }

    public VehicleResponse purchaseVehicle(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new VehicleNotFoundException(id));

        if (vehicle.getQuantity().equals(0)) {
            throw new IllegalStateException("Vehicle is out of stock");
        }

        vehicle.setQuantity(vehicle.getQuantity() - 1);

        Vehicle updatedVehicle = vehicleRepository.save(vehicle);

        return new VehicleResponse(
                updatedVehicle.getId(),
                updatedVehicle.getMake(),
                updatedVehicle.getModel(),
                updatedVehicle.getCategory(),
                updatedVehicle.getPrice(),
                updatedVehicle.getQuantity()
        );
    }


    public VehicleResponse restockVehicle(Long id, RestockRequest request) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new VehicleNotFoundException(id));

        vehicle.setQuantity(vehicle.getQuantity() + request.quantity());

        Vehicle updatedVehicle = vehicleRepository.save(vehicle);

        return new VehicleResponse(
                updatedVehicle.getId(),
                updatedVehicle.getMake(),
                updatedVehicle.getModel(),
                updatedVehicle.getCategory(),
                updatedVehicle.getPrice(),
                updatedVehicle.getQuantity()
        );
    }

    public void deleteVehicle(Long id) {
        throw new UnsupportedOperationException();
    }
}