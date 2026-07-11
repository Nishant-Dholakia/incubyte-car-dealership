package com.incubyte.cardealership.vehicle.repository;

import com.incubyte.cardealership.vehicle.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    @Query("""
            SELECT v
            FROM Vehicle v
            WHERE (:make IS NULL OR LOWER(v.make) LIKE LOWER(CONCAT('%', :make, '%')))
              AND (:model IS NULL OR LOWER(v.model) LIKE LOWER(CONCAT('%', :model, '%')))
              AND (:category IS NULL OR LOWER(v.category) LIKE LOWER(CONCAT('%', :category, '%')))
              AND (:minPrice IS NULL OR v.price >= :minPrice)
              AND (:maxPrice IS NULL OR v.price <= :maxPrice)
            """)
    List<Vehicle> searchVehicles(
            String make,
            String model,
            String category,
            BigDecimal minPrice,
            BigDecimal maxPrice
    );
}