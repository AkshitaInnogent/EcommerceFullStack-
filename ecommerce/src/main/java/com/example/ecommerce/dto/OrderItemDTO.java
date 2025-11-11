package com.example.ecommerce.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemDTO {
    private Long id;
    private ProductDTO product;
    private Integer quantity;
    private Double price;
}

