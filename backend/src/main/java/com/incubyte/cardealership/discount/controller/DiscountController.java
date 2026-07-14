package com.incubyte.cardealership.discount.controller;

import com.incubyte.cardealership.discount.dto.DiscountRequest;
import com.incubyte.cardealership.discount.dto.DiscountResponse;
import com.incubyte.cardealership.discount.service.DiscountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/discounts")
@RequiredArgsConstructor
public class DiscountController {

    private final DiscountService discountService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DiscountResponse createDiscount(@Valid @RequestBody DiscountRequest request) {
        return discountService.createDiscount(request);
    }

    @GetMapping
    public List<DiscountResponse> getAllDiscounts() {
        return discountService.getAllDiscounts();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteDiscount(@PathVariable Long id) {
        discountService.deleteDiscount(id);
    }
}
