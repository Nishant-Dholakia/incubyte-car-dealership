package com.incubyte.cardealership.vehicle.service;

import com.incubyte.cardealership.exception.VehicleNotFoundException;
import com.incubyte.cardealership.vehicle.dto.VehicleRequest;
import com.incubyte.cardealership.vehicle.dto.VehicleResponse;
import com.incubyte.cardealership.vehicle.dto.VehicleSearchRequest;
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
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

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


    void shouldReturnAllVehicles() {
        Vehicle vehicle1 = Vehicle.builder()
                .id(1L)
                .make("Toyota")
                .model("Camry")
                .category("Sedan")
                .price(BigDecimal.valueOf(25000))
                .quantity(5)
                .build();

        Vehicle vehicle2 = Vehicle.builder()
                .id(2L)
                .make("BMW")
                .model("X5")
                .category("SUV")
                .price(BigDecimal.valueOf(60000))
                .quantity(2)
                .build();

        when(vehicleRepository.findAll())
                .thenReturn(List.of(vehicle1, vehicle2));

        List<VehicleResponse> response = vehicleService.getAllVehicles();

        assertEquals(2, response.size());

        VehicleResponse first = response.getFirst();

        assertEquals(1L, first.id());
        assertEquals("Toyota", first.make());
        assertEquals("Camry", first.model());
        assertEquals("Sedan", first.category());
        assertEquals(BigDecimal.valueOf(25000), first.price());
        assertEquals(5, first.quantity());

        verify(vehicleRepository).findAll();
    }

    @Test
    void shouldReturnEmptyListWhenNoVehiclesExist() {
        when(vehicleRepository.findAll()).thenReturn(List.of());

        List<VehicleResponse> response = vehicleService.getAllVehicles();

        assertTrue(response.isEmpty());

        verify(vehicleRepository).findAll();
    }


    // VEHICLE SEARCH
    @Test
    void shouldReturnSearchResults() {
        VehicleSearchRequest request = new VehicleSearchRequest(
                "Toyota",
                null,
                null,
                null,
                null
        );

        Vehicle vehicle = Vehicle.builder()
                .id(1L)
                .make("Toyota")
                .model("Camry")
                .category("Sedan")
                .price(BigDecimal.valueOf(25000))
                .quantity(5)
                .build();

        when(vehicleRepository.searchVehicles(
                request.make(),
                request.model(),
                request.category(),
                request.minPrice(),
                request.maxPrice()
        )).thenReturn(List.of(vehicle));

        List<VehicleResponse> response = vehicleService.searchVehicles(request);

        assertEquals(1, response.size());

        VehicleResponse vehicleResponse = response.getFirst();

        assertEquals("Toyota", vehicleResponse.make());
        assertEquals("Camry", vehicleResponse.model());
        assertEquals("Sedan", vehicleResponse.category());
        assertEquals(BigDecimal.valueOf(25000), vehicleResponse.price());
        assertEquals(5, vehicleResponse.quantity());

        verify(vehicleRepository).searchVehicles(
                request.make(),
                request.model(),
                request.category(),
                request.minPrice(),
                request.maxPrice()
        );
    }


    // VEHICLE PURCHASE

    @Test
    void shouldPurchaseVehicleSuccessfully() {
        Vehicle vehicle = Vehicle.builder()
                .id(1L)
                .make("Toyota")
                .model("Camry")
                .category("Sedan")
                .price(BigDecimal.valueOf(25000))
                .quantity(5)
                .build();

        when(vehicleRepository.findById(1L))
                .thenReturn(Optional.of(vehicle));

        when(vehicleRepository.save(any(Vehicle.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        VehicleResponse response = vehicleService.purchaseVehicle(1L);

        assertEquals(4, response.quantity());

        verify(vehicleRepository).findById(1L);
        verify(vehicleRepository).save(any(Vehicle.class));
    }

    @Test
    void shouldThrowWhenVehicleDoesNotExist() {
        when(vehicleRepository.findById(1L))
                .thenReturn(Optional.empty());

        assertThrows(
                VehicleNotFoundException.class,
                () -> vehicleService.purchaseVehicle(1L)
        );

        verify(vehicleRepository).findById(1L);
        verify(vehicleRepository, never()).save(any());
    }

    @Test
    void shouldThrowWhenVehicleIsOutOfStock() {
        Vehicle vehicle = Vehicle.builder()
                .id(1L)
                .make("Toyota")
                .model("Camry")
                .category("Sedan")
                .price(BigDecimal.valueOf(25000))
                .quantity(0)
                .build();

        when(vehicleRepository.findById(1L))
                .thenReturn(Optional.of(vehicle));

        assertThrows(
                IllegalStateException.class,
                () -> vehicleService.purchaseVehicle(1L)
        );

        verify(vehicleRepository).findById(1L);
        verify(vehicleRepository, never()).save(any());
    }
}