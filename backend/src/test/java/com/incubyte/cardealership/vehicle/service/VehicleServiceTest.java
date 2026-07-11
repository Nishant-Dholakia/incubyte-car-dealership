package com.incubyte.cardealership.vehicle.service;

import com.incubyte.cardealership.vehicle.dto.VehicleRequest;
import com.incubyte.cardealership.vehicle.entity.Vehicle;
import com.incubyte.cardealership.vehicle.repository.VehicleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class VehicleServiceTest {

    @Mock
    private VehicleRepository vehicleRepository;

    @InjectMocks
    private VehicleService vehicleService;

    private VehicleRequest validRequest;

    @BeforeEach
    void setUp() {
        validRequest = new VehicleRequest(
                "Toyota",
                "Camry",
                "Sedan",
                BigDecimal.valueOf(25000),
                5
        );
    }

    @Test
    void shouldAddVehicleSuccessfully() {
        vehicleService.addVehicle(validRequest);

        ArgumentCaptor<Vehicle> captor = ArgumentCaptor.forClass(Vehicle.class);
        verify(vehicleRepository).save(captor.capture());

        Vehicle saved = captor.getValue();

        assertEquals("Toyota", saved.getMake());
        assertEquals("Camry", saved.getModel());
        assertEquals("Sedan", saved.getCategory());
        assertEquals(BigDecimal.valueOf(25000), saved.getPrice());
        assertEquals(5, saved.getQuantity());
    }

    @Test
    void shouldThrowWhenMakeIsNull() {
        VehicleRequest request = new VehicleRequest(
                null,
                "Camry",
                "Sedan",
                BigDecimal.valueOf(25000),
                5
        );

        assertThrows(IllegalArgumentException.class,
                () -> vehicleService.addVehicle(request));
    }

    @Test
    void shouldThrowWhenMakeIsBlank() {
        VehicleRequest request = new VehicleRequest(
                " ",
                "Camry",
                "Sedan",
                BigDecimal.valueOf(25000),
                5
        );

        assertThrows(IllegalArgumentException.class,
                () -> vehicleService.addVehicle(request));
    }

    @Test
    void shouldThrowWhenModelIsNull() {
        VehicleRequest request = new VehicleRequest(
                "Toyota",
                null,
                "Sedan",
                BigDecimal.valueOf(25000),
                5
        );

        assertThrows(IllegalArgumentException.class,
                () -> vehicleService.addVehicle(request));
    }

    @Test
    void shouldThrowWhenModelIsBlank() {
        VehicleRequest request = new VehicleRequest(
                "Toyota",
                " ",
                "Sedan",
                BigDecimal.valueOf(25000),
                5
        );

        assertThrows(IllegalArgumentException.class,
                () -> vehicleService.addVehicle(request));
    }

    @Test
    void shouldThrowWhenCategoryIsNull() {
        VehicleRequest request = new VehicleRequest(
                "Toyota",
                "Camry",
                null,
                BigDecimal.valueOf(25000),
                5
        );

        assertThrows(IllegalArgumentException.class,
                () -> vehicleService.addVehicle(request));
    }

    @Test
    void shouldThrowWhenCategoryIsBlank() {
        VehicleRequest request = new VehicleRequest(
                "Toyota",
                "Camry",
                " ",
                BigDecimal.valueOf(25000),
                5
        );

        assertThrows(IllegalArgumentException.class,
                () -> vehicleService.addVehicle(request));
    }

    @Test
    void shouldThrowWhenPriceIsNull() {
        VehicleRequest request = new VehicleRequest(
                "Toyota",
                "Camry",
                "Sedan",
                null,
                5
        );

        assertThrows(IllegalArgumentException.class,
                () -> vehicleService.addVehicle(request));
    }

    @Test
    void shouldThrowWhenPriceIsNegative() {
        VehicleRequest request = new VehicleRequest(
                "Toyota",
                "Camry",
                "Sedan",
                BigDecimal.valueOf(-1),
                5
        );

        assertThrows(IllegalArgumentException.class,
                () -> vehicleService.addVehicle(request));
    }

    @Test
    void shouldThrowWhenQuantityIsNull() {
        VehicleRequest request = new VehicleRequest(
                "Toyota",
                "Camry",
                "Sedan",
                BigDecimal.valueOf(25000),
                null
        );

        assertThrows(IllegalArgumentException.class,
                () -> vehicleService.addVehicle(request));
    }

    @Test
    void shouldThrowWhenQuantityIsNegative() {
        VehicleRequest request = new VehicleRequest(
                "Toyota",
                "Camry",
                "Sedan",
                BigDecimal.valueOf(25000),
                -1
        );

        assertThrows(IllegalArgumentException.class,
                () -> vehicleService.addVehicle(request));
    }
}