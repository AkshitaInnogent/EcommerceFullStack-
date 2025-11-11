package com.example.ecommerce.dto;

import com.example.ecommerce.entity.OrderStatus;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {
    private Long id;
    private LocalDateTime orderDate;
    private Double totalAmount;
    private Double discount;
    private Double finalAmount;
    private OrderStatus status;
    private List<OrderItemDTO> items;
    private AddressDTO address;
    private String promoCode;
}
