package com.example.ecommerce.service;

import com.example.ecommerce.dto.*;
import com.example.ecommerce.entity.*;
import com.example.ecommerce.exception.ResourceNotFoundException;
import com.example.ecommerce.repository.OrderRepository;
import com.example.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final PromoCodeService promoCodeService;

    @Transactional
    public OrderDTO checkout(CheckoutRequestDTO request) {
        Order order = new Order();
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING);

        order.setAddress(Address.builder()
            .fullName(request.getAddress().getFullName())
            .phoneNumber(request.getAddress().getPhoneNumber())
            .addressLine1(request.getAddress().getAddressLine1())
            .addressLine2(request.getAddress().getAddressLine2())
            .city(request.getAddress().getCity())
            .state(request.getAddress().getState())
            .zipCode(request.getAddress().getZipCode())
            .country(request.getAddress().getCountry())
            .build());

        double total = 0.0;
        for (CartItemDTO item : request.getItems()) {
            Product product = productRepository.findById(item.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

            OrderItem orderItem = OrderItem.builder()
                .order(order)
                .product(product)
                .quantity(item.getQuantity())
                .price(product.getPrice())
                .build();

            order.getItems().add(orderItem);
            total += product.getPrice() * item.getQuantity();
        }

        order.setTotalAmount(total);

        if (request.getPromoCode() != null && !request.getPromoCode().isEmpty()) {
            PromoValidationDTO validation = promoCodeService.validatePromoCode(request.getPromoCode());
            if (validation.getValid()) {
                double discount = (total * validation.getDiscountPercentage()) / 100;
                order.setDiscount(discount);
                order.setPromoCode(request.getPromoCode());
                order.setFinalAmount(total - discount);
            } else {
                order.setFinalAmount(total);
            }
        } else {
            order.setFinalAmount(total);
        }

        Order savedOrder = orderRepository.save(order);
        return convertToDTO(savedOrder);
    }

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public OrderDTO getOrderById(Long id) {
        Order order = orderRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        return convertToDTO(order);
    }

    private OrderDTO convertToDTO(Order order) {
        return OrderDTO.builder()
            .id(order.getId())
            .orderDate(order.getOrderDate())
            .totalAmount(order.getTotalAmount())
            .discount(order.getDiscount())
            .finalAmount(order.getFinalAmount())
            .status(order.getStatus())
            .items(order.getItems().stream()
                .map(this::convertItemToDTO)
                .collect(Collectors.toList()))
            .address(convertAddressToDTO(order.getAddress()))
            .promoCode(order.getPromoCode())
            .build();
    }

    private OrderItemDTO convertItemToDTO(OrderItem item) {
        return OrderItemDTO.builder()
            .id(item.getId())
            .product(convertProductToDTO(item.getProduct()))
            .quantity(item.getQuantity())
            .price(item.getPrice())
            .build();
    }

    private ProductDTO convertProductToDTO(Product product) {
        return ProductDTO.builder()
            .id(product.getId())
            .title(product.getTitle())
            .price(product.getPrice())
            .description(product.getDescription())
            .category(product.getCategory())
            .image(product.getImage())
            .build();
    }

    private AddressDTO convertAddressToDTO(Address address) {
        if (address == null) return null;
        return AddressDTO.builder()
            .fullName(address.getFullName())
            .phoneNumber(address.getPhoneNumber())
            .addressLine1(address.getAddressLine1())
            .addressLine2(address.getAddressLine2())
            .city(address.getCity())
            .state(address.getState())
            .zipCode(address.getZipCode())
            .country(address.getCountry())
            .build();
    }

    @Transactional
    public void deleteOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        orderRepository.delete(order);
    }

}
