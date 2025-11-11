package com.example.ecommerce.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.example.ecommerce.dto.PromoValidationDTO;
import com.example.ecommerce.repository.PromoCodeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PromoCodeService {
    private final PromoCodeRepository promoCodeRepository;

    public PromoValidationDTO validatePromoCode(String code) {
        return promoCodeRepository.findByCodeAndActiveTrue(code)
            .map(promo -> {
                LocalDateTime now = LocalDateTime.now();
                if (promo.getValidFrom() != null && now.isBefore(promo.getValidFrom())) {
                    return PromoValidationDTO.builder()
                        .valid(false)
                        .message("Promo code is not yet valid")
                        .build();
                }
                if (promo.getValidUntil() != null && now.isAfter(promo.getValidUntil())) {
                    return PromoValidationDTO.builder()
                        .valid(false)
                        .message("Promo code has expired")
                        .build();
                }
                return PromoValidationDTO.builder()
                    .valid(true)
                    .discountPercentage(promo.getDiscountPercentage())
                    .message("Promo code applied successfully")
                    .build();
            })
            .orElse(PromoValidationDTO.builder()
                .valid(false)
                .message("Invalid promo code")
                .build());
    }
}
