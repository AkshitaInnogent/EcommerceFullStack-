package com.example.ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "promo_codes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromoCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String code;
    
    @Column(nullable = false)
    private Double discountPercentage;
    
    private LocalDateTime validFrom;
    private LocalDateTime validUntil;
    
    @Column(nullable = false)
    private Boolean active = true;
}
