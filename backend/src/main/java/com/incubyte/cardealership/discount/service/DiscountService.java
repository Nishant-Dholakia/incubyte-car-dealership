package com.incubyte.cardealership.discount.service;

import com.incubyte.cardealership.discount.dto.DiscountRequest;
import com.incubyte.cardealership.discount.dto.DiscountResponse;
import com.incubyte.cardealership.discount.entity.Discount;
import com.incubyte.cardealership.discount.repository.DiscountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DiscountService {

    private final DiscountRepository discountRepository;

    public DiscountResponse createDiscount(DiscountRequest request) {
        if (request.vehicleId() == null && (request.make() == null || request.make().isBlank())) {
            throw new IllegalArgumentException("Either Vehicle ID or Make must be provided as a target for the discount");
        }

        if (request.startDate().isAfter(request.endDate())) {
            throw new IllegalArgumentException("Start date must be before end date");
        }

        Discount discount = Discount.builder()
                .vehicleId(request.vehicleId())
                .make(request.make() != null ? request.make().trim() : null)
                .discountRate(request.discountRate())
                .startDate(request.startDate())
                .endDate(request.endDate())
                .build();

        discount = discountRepository.save(discount);

        return toDiscountResponse(discount);
    }

    public List<DiscountResponse> getAllDiscounts() {
        return discountRepository.findAll()
                .stream()
                .map(this::toDiscountResponse)
                .toList();
    }

    public void deleteDiscount(Long id) {
        if (!discountRepository.existsById(id)) {
            throw new IllegalArgumentException("Discount with ID " + id + " does not exist");
        }
        discountRepository.deleteById(id);
    }

    public Double getActiveDiscountRate(Long vehicleId, String make, LocalDateTime atTime) {
        List<Discount> activeDiscounts = discountRepository.findActiveDiscounts(vehicleId, make, atTime);
        return activeDiscounts.stream()
                .mapToDouble(Discount::getDiscountRate)
                .max()
                .orElse(0.0);
    }

    private DiscountResponse toDiscountResponse(Discount discount) {
        return new DiscountResponse(
                discount.getId(),
                discount.getVehicleId(),
                discount.getMake(),
                discount.getDiscountRate(),
                discount.getStartDate(),
                discount.getEndDate()
        );
    }
}
