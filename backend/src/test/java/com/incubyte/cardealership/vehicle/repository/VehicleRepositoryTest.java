package com.incubyte.cardealership.vehicle.repository;

import com.incubyte.cardealership.vehicle.dto.VehicleSearchRequest;
import com.incubyte.cardealership.vehicle.entity.Vehicle;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
class VehicleRepositoryTest {

    @Autowired
    private VehicleRepository vehicleRepository;

    @BeforeEach
    void setUp() {
        vehicleRepository.saveAll(List.of(
                Vehicle.builder()
                        .make("Toyota")
                        .model("Camry")
                        .category("Sedan")
                        .price(BigDecimal.valueOf(25000))
                        .quantity(5)
                        .build(),

                Vehicle.builder()
                        .make("Toyota")
                        .model("Corolla")
                        .category("Sedan")
                        .price(BigDecimal.valueOf(22000))
                        .quantity(4)
                        .build(),

                Vehicle.builder()
                        .make("BMW")
                        .model("X5")
                        .category("SUV")
                        .price(BigDecimal.valueOf(65000))
                        .quantity(2)
                        .build()
        ));
    }

    @Test
    void shouldSearchByMake() {
        VehicleSearchRequest request = new VehicleSearchRequest(
                "Toyota", null, null, null, null
        );

        List<Vehicle> result = vehicleRepository.searchVehicles(
                request.make(),
                request.model(),
                request.category(),
                request.minPrice(),
                request.maxPrice()
        );

        assertEquals(2, result.size());
    }

    @Test
    void shouldSearchByModel() {
        VehicleSearchRequest request = new VehicleSearchRequest(
                null, "Camry", null, null, null
        );

        List<Vehicle> result = vehicleRepository.searchVehicles(
                request.make(),
                request.model(),
                request.category(),
                request.minPrice(),
                request.maxPrice()
        );

        assertEquals(1, result.size());
        assertEquals("Camry", result.getFirst().getModel());
    }

    @Test
    void shouldSearchByCategory() {
        VehicleSearchRequest request = new VehicleSearchRequest(
                null, null, "SUV", null, null
        );

        List<Vehicle> result = vehicleRepository.searchVehicles(
                request.make(),
                request.model(),
                request.category(),
                request.minPrice(),
                request.maxPrice()
        );

        assertEquals(1, result.size());
    }

    @Test
    void shouldSearchByPriceRange() {
        VehicleSearchRequest request = new VehicleSearchRequest(
                null,
                null,
                null,
                BigDecimal.valueOf(20000),
                BigDecimal.valueOf(30000)
        );

        List<Vehicle> result = vehicleRepository.searchVehicles(
                request.make(),
                request.model(),
                request.category(),
                request.minPrice(),
                request.maxPrice()
        );

        assertEquals(2, result.size());
    }

    @Test
    void shouldSearchUsingMultipleFilters() {
        VehicleSearchRequest request = new VehicleSearchRequest(
                "Toyota",
                null,
                "Sedan",
                BigDecimal.valueOf(24000),
                BigDecimal.valueOf(26000)
        );

        List<Vehicle> result = vehicleRepository.searchVehicles(
                request.make(),
                request.model(),
                request.category(),
                request.minPrice(),
                request.maxPrice()
        );

        assertEquals(1, result.size());
        assertEquals("Camry", result.getFirst().getModel());
    }

    @Test
    void shouldReturnAllVehiclesWhenNoFiltersProvided() {
        VehicleSearchRequest request = new VehicleSearchRequest(
                null, null, null, null, null
        );

        List<Vehicle> result = vehicleRepository.searchVehicles(
                request.make(),
                request.model(),
                request.category(),
                request.minPrice(),
                request.maxPrice()
        );

        assertEquals(3, result.size());
    }

    @Test
    void shouldReturnEmptyListWhenNoVehicleMatches() {
        VehicleSearchRequest request = new VehicleSearchRequest(
                "Audi", null, null, null, null
        );

        List<Vehicle> result = vehicleRepository.searchVehicles(
                request.make(),
                request.model(),
                request.category(),
                request.minPrice(),
                request.maxPrice()
        );

        assertTrue(result.isEmpty());
    }
}