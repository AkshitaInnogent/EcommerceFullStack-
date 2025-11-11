package com.example.ecommerce.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ecommerce.dto.PromoValidationDTO;
import com.example.ecommerce.service.PromoCodeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/promo")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PromoCodeController {
    private final PromoCodeService promoCodeService;

    @PostMapping("/validate")
    public ResponseEntity<PromoValidationDTO> validatePromoCode(@RequestParam String code) {
        return ResponseEntity.ok(promoCodeService.validatePromoCode(code));
    }
}
