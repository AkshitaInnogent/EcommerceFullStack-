package com.example.ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Double price;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private String category;

    private String image;

    @Column(nullable = false)
    private Integer stock = 100;
}
