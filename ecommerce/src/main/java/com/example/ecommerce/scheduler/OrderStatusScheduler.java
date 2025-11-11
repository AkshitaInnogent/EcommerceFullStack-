package com.example.ecommerce.scheduler;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.ecommerce.entity.Order;
import com.example.ecommerce.entity.OrderStatus;
import com.example.ecommerce.repository.OrderRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class OrderStatusScheduler {
    private final OrderRepository orderRepository;

    @Scheduled(fixedRate = 300000) // Run every 5 minutes
    public void updateOrderStatus() {
        LocalDateTime sixHoursAgo = LocalDateTime.now().minusHours(6);
        List<Order> orders = orderRepository.findByStatusAndOrderDateBefore(
            OrderStatus.PENDING,
            sixHoursAgo
        );

        orders.forEach(order -> {
            order.setStatus(OrderStatus.DELIVERED);
            orderRepository.save(order);
            log.info("Order {} marked as DELIVERED", order.getId());
        });
    }
}
