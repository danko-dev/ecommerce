package com.example.ecommerce.controller;

import com.example.ecommerce.model.*;
import com.example.ecommerce.repository.ProductRepository;
import com.example.ecommerce.repository.OrderRepository;
import com.example.ecommerce.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/checkout")
@CrossOrigin(origins = "http://localhost:5173")
public class CheckoutController {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public CheckoutController(ProductRepository productRepository, OrderRepository orderRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public Map<String, Object> checkout(@RequestBody CheckoutRequest request) {
        double serverTotal = request.items().stream()
                .mapToDouble(item -> {
                    Product p = productRepository.findById(item.productId())
                            .orElseThrow(() -> new RuntimeException("Product not found: " + item.productId()));
                    return p.getPrice() * Math.max(1, item.qty());
                }).sum();

        // Persist order if userId provided
        if (request.userId() != null) {
            User user = userRepository.findById(request.userId())
                    .orElseThrow(() -> new RuntimeException("User not found: " + request.userId()));
            Order order = new Order();
            order.setUser(user);
            order.setTotal(serverTotal);

            for (CheckoutItem item : request.items()) {
                Product p = productRepository.findById(item.productId()).orElseThrow();
                OrderItem oi = new OrderItem();
                oi.setOrder(order);
                oi.setProduct(p);
                oi.setQty(Math.max(1, item.qty()));
                oi.setPrice(p.getPrice());
                order.getItems().add(oi);
            }
            orderRepository.save(order);
        }

        return Map.of(
                "orderId", UUID.randomUUID().toString(),
                "status", "PAID", // mock payment success
                "chargedTotal", serverTotal,
                "currency", "USD",
                "createdAt", Instant.now().toString()
        );
    }

    public record CheckoutRequest(Long userId, List<CheckoutItem> items) {}
    public record CheckoutItem(Long productId, int qty) {}
}


