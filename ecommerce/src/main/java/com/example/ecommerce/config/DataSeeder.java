package com.example.ecommerce.config;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.ecommerce.entity.Product;
import com.example.ecommerce.entity.PromoCode;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.repository.PromoCodeRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final PromoCodeRepository promoCodeRepository;

    @Override
    public void run(String... args) {
        if (productRepository.count() == 0) {
            seedProducts();
        }
        if (promoCodeRepository.count() == 0) {
            seedPromoCodes();
        }
    }

    private void seedProducts() {
        List<Product> products = List.of(
            Product.builder()
                .title("Wireless Bluetooth Headphones")
                .price(79.99)
                .description("Premium sound quality with active noise cancellation")
                .category("electronics")
                .image("https://images.unsplash.com/photo-1505740420928-5e560c06d30e")
                .stock(50)
                .build(),
            Product.builder()
                .title("Smart Watch Pro")
                .price(299.99)
                .description("Fitness tracker with heart rate monitor and GPS")
                .category("electronics")
                .image("https://images.unsplash.com/photo-1523275335684-37898b6baf30")
                .stock(30)
                .build(),
            Product.builder()
                .title("Men's Casual Shirt")
                .price(49.99)
                .description("100% cotton, comfortable fit")
                .category("men's clothing")
                .image("https://images.unsplash.com/photo-1596755094514-f87e34085b2c")
                .stock(100)
                .build(),
            Product.builder()
                .title("Women's Summer Dress")
                .price(89.99)
                .description("Elegant floral print dress")
                .category("women's clothing")
                .image("https://images.unsplash.com/photo-1572804013309-59a88b7e92f1")
                .stock(75)
                .build(),
            Product.builder()
                .title("Gold Necklace")
                .price(499.99)
                .description("18k gold plated elegant necklace")
                .category("jewelery")
                .image("https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f")
                .stock(20)
                .build()
        );

        productRepository.saveAll(products);
        System.out.println("✅ Products seeded successfully!");
    }

    private void seedPromoCodes() {
        List<PromoCode> promoCodes = List.of(
            PromoCode.builder()
                .code("WELCOME10")
                .discountPercentage(10.0)
                .validFrom(LocalDateTime.now().minusDays(1))
                .validUntil(LocalDateTime.now().plusMonths(1))
                .active(true)
                .build(),
            PromoCode.builder()
                .code("SAVE20")
                .discountPercentage(20.0)
                .validFrom(LocalDateTime.now())
                .validUntil(LocalDateTime.now().plusDays(30))
                .active(true)
                .build(),
            PromoCode.builder()
                .code("FIRST50")
                .discountPercentage(50.0)
                .validFrom(LocalDateTime.now())
                .validUntil(LocalDateTime.now().plusWeeks(2))
                .active(true)
                .build()
        );

        promoCodeRepository.saveAll(promoCodes);
        System.out.println("✅ Promo codes seeded successfully!");
    }
}
