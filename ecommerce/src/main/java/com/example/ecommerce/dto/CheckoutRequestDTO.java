package com.example.ecommerce.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CheckoutRequestDTO {
    @NotEmpty(message = "Cart items cannot be empty")
    private List<CartItemDTO> items;
    
    @Valid
    @NotNull(message = "Address is required")
    private AddressDTO address;
    
    private String promoCode;
}
