package com.incubyte.cardealership.discount.repository;

import com.incubyte.cardealership.discount.entity.Discount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DiscountRepository extends JpaRepository<Discount, Long> {

    @Query("SELECT d FROM Discount d WHERE " +
           "(d.vehicleId = :vehicleId OR (d.make IS NOT NULL AND LOWER(d.make) = LOWER(:make))) " +
           "AND :dateTime BETWEEN d.startDate AND d.endDate")
    List<Discount> findActiveDiscounts(
            @Param("vehicleId") Long vehicleId,
            @Param("make") String make,
            @Param("dateTime") LocalDateTime dateTime
    );
}
