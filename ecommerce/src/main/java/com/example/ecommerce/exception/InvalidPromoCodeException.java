package com.example.ecommerce.exception;

public class InvalidPromoCodeException extends RuntimeException {
    public InvalidPromoCodeException(String message) {
        super(message);
    }
}
