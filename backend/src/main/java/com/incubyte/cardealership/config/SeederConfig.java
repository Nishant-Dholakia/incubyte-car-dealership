package com.incubyte.cardealership.config;


import com.incubyte.cardealership.auth.entity.User;
import com.incubyte.cardealership.auth.enums.Role;
import com.incubyte.cardealership.auth.repository.UserRepository;
import com.incubyte.cardealership.vehicle.entity.Vehicle;
import com.incubyte.cardealership.vehicle.repository.VehicleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class SeederConfig {

    @Bean
    CommandLineRunner seedAdmin(UserRepository userRepository,
                                PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByEmail("admin@dealer.com").isEmpty()) {
                User admin = new User();
                admin.setEmail("admin@dealer.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole(Role.ADMIN);

                userRepository.save(admin);
            }
        };
    }

    @Bean
    CommandLineRunner seedUser(UserRepository userRepository,
                                PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByEmail("user@demo.com").isEmpty()) {
                User admin = new User();
                admin.setEmail("user@demo.com");
                admin.setPassword(passwordEncoder.encode("user123"));
                admin.setRole(Role.USER);

                userRepository.save(admin);
            }
        };
    }

    @Bean
    CommandLineRunner seedVehicles(VehicleRepository vehicleRepository) {
        return args -> {
            if (vehicleRepository.count() > 0) {
                return;
            }

            vehicleRepository.saveAll(
                    List.of(
                            new Vehicle(null, "Toyota", "Camry", "Sedan", new BigDecimal("28500"), 5),
                            new Vehicle(null, "Toyota", "Corolla", "Sedan", new BigDecimal("24500"), 7),
                            new Vehicle(null, "Toyota", "Fortuner", "SUV", new BigDecimal("52000"), 3),

                            new Vehicle(null, "Honda", "City", "Sedan", new BigDecimal("19500"), 8),
                            new Vehicle(null, "Honda", "Civic", "Sedan", new BigDecimal("26500"), 4),
                            new Vehicle(null, "Honda", "CR-V", "SUV", new BigDecimal("36000"), 2),

                            new Vehicle(null, "Hyundai", "Creta", "SUV", new BigDecimal("24500"), 6),
                            new Vehicle(null, "Hyundai", "Verna", "Sedan", new BigDecimal("21000"), 5),
                            new Vehicle(null, "Hyundai", "Tucson", "SUV", new BigDecimal("39000"), 2),

                            new Vehicle(null, "Mahindra", "Scorpio", "SUV", new BigDecimal("32000"), 4),
                            new Vehicle(null, "Mahindra", "XUV700", "SUV", new BigDecimal("34000"), 3),
                            new Vehicle(null, "Mahindra", "Thar", "Off-Road", new BigDecimal("30000"), 5),

                            new Vehicle(null, "Tata", "Nexon", "SUV", new BigDecimal("22000"), 7),
                            new Vehicle(null, "Tata", "Harrier", "SUV", new BigDecimal("31000"), 3),
                            new Vehicle(null, "Tata", "Nexon EV", "Electric", new BigDecimal("25500"), 6),

                            new Vehicle(null, "Tesla", "Model 3", "Electric", new BigDecimal("48990"), 3),
                            new Vehicle(null, "Tesla", "Model Y", "Electric", new BigDecimal("55990"), 2),
                            new Vehicle(null, "Tesla", "Model S", "Electric", new BigDecimal("89990"), 1),

                            new Vehicle(null, "BMW", "3 Series", "Luxury", new BigDecimal("52000"), 3),
                            new Vehicle(null, "BMW", "5 Series", "Luxury", new BigDecimal("69000"), 2),
                            new Vehicle(null, "BMW", "X5", "Luxury SUV", new BigDecimal("78000"), 2),

                            new Vehicle(null, "Mercedes-Benz", "C-Class", "Luxury", new BigDecimal("67000"), 2),
                            new Vehicle(null, "Mercedes-Benz", "E-Class", "Luxury", new BigDecimal("78000"), 2),
                            new Vehicle(null, "Mercedes-Benz", "GLC", "Luxury SUV", new BigDecimal("74000"), 2),

                            new Vehicle(null, "Audi", "A4", "Luxury", new BigDecimal("55000"), 3),
                            new Vehicle(null, "Audi", "Q5", "Luxury SUV", new BigDecimal("67000"), 2),

                            new Vehicle(null, "Ford", "Mustang", "Sports", new BigDecimal("58000"), 2),

                            new Vehicle(null, "Chevrolet", "Camaro", "Sports", new BigDecimal("61000"), 2),

                            new Vehicle(null, "Porsche", "911 Carrera", "Sports", new BigDecimal("125000"), 1),

                            new Vehicle(null, "Lamborghini", "Huracan EVO", "Supercar", new BigDecimal("275000"), 1)
                    )
            );
        };
    }
}
