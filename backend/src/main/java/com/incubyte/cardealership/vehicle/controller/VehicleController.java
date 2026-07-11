package com.incubyte.cardealership.vehicle.controller;

import com.incubyte.cardealership.vehicle.dto.VehicleRequest;
import com.incubyte.cardealership.vehicle.dto.VehicleResponse;
import com.incubyte.cardealership.vehicle.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public VehicleResponse addVehicle(@RequestBody VehicleRequest request) {
        return vehicleService.addVehicle(request);
    }
}