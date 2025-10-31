package com.example.ecommerce.config;

import com.example.ecommerce.model.Product;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadData(ProductRepository repository) {
        return args -> {
            repository.save(new Product(
                    "Headphones",
                    "Noise cancelling over-ear headphones",
                    199.0,
                    4.5,
                    "https://picsum.photos/seed/headphones/800/600"
            ));
            repository.save(new Product(
                    "Smartwatch",
                    "Fitness tracking smartwatch",
                    249.0,
                    4.2,
                    "https://picsum.photos/seed/smartwatch/800/600"
            ));
            repository.save(new Product(
                    "Bluetooth Speaker",
                    "Portable waterproof Bluetooth speaker",
                    129.0,
                    4.4,
                    "https://picsum.photos/seed/speaker/800/600"
            ));
            repository.save(new Product(
                    "Gaming Mouse",
                    "Ergonomic RGB gaming mouse",
                    59.0,
                    4.6,
                    "https://picsum.photos/seed/mouse/800/600"
            ));
            repository.save(new Product(
                    "4K Monitor",
                    "27-inch 4K UHD IPS monitor",
                    399.0,
                    4.7,
                    "https://picsum.photos/seed/monitor/800/600"
            ));
            repository.save(new Product(
                    "Mechanical Keyboard",
                    "Hot-swappable mechanical keyboard with RGB",
                    149.0,
                    4.8,
                    "https://picsum.photos/seed/keyboard/800/600"
            ));
            repository.save(new Product(
                    "Drone",
                    "4K camera drone with 3-axis gimbal",
                    699.0,
                    4.5,
                    "https://picsum.photos/seed/drone/800/600"
            ));
            repository.save(new Product(
                    "Action Camera",
                    "Waterproof 4K action camera",
                    299.0,
                    4.3,
                    "https://picsum.photos/seed/actioncam/800/600"
            ));
            repository.save(new Product(
                    "VR Headset",
                    "Standalone VR headset with controllers",
                    399.0,
                    4.4,
                    "https://picsum.photos/seed/vr/800/600"
            ));
            repository.save(new Product(
                    "Laptop Stand",
                    "Aluminum adjustable laptop stand",
                    39.0,
                    4.1,
                    "https://picsum.photos/seed/stand/800/600"
            ));
            repository.save(new Product(
                    "USB-C Hub",
                    "7-in-1 USB-C hub with HDMI",
                    49.0,
                    4.2,
                    "https://picsum.photos/seed/hub/800/600"
            ));
        };
    }
}
