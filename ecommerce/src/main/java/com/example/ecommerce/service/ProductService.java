package com.example.ecommerce.service;

import com.example.ecommerce.dto.ProductDTO;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.exception.ResourceNotFoundException;
import com.example.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return convertToDTO(product);
    }

    public List<ProductDTO> getProductsByCategory(String category) {
        return productRepository.findByCategory(category).stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    private ProductDTO convertToDTO(Product product) {
        return ProductDTO.builder()
            .id(product.getId())
            .title(product.getTitle())
            .price(product.getPrice())
            .description(product.getDescription())
            .category(product.getCategory())
            .image(product.getImage())
            .stock(product.getStock())
            .build();
    }
}
