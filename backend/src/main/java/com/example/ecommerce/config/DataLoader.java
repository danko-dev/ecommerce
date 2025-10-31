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
                    "https://images.unsplash.com/photo-1518443895911-8e6e7b63d3a0?auto=format&fit=crop&w=800&q=80"
            ));
            repository.save(new Product(
                    "Smartwatch",
                    "Fitness tracking smartwatch",
                    249.0,
                    4.2,
                    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
            ));
        };
    }
}
