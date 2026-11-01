package com.icestore.config;

import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.icestore.model.Product;
import com.icestore.repository.ProductRepository;

@Configuration
public class SeedData {
  @Bean CommandLineRunner seed(ProductRepository products) { return args -> { if (products.count() == 0) products.saveAll(List.of(new Product("tee", "Core Cotton Tee", "T-Shirts", 899, 999, "10% OFF", 4.7, "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85", List.of("White", "Black"), List.of("S", "M", "L", "XL"), 100), new Product("overshirt", "Utility Overshirt", "Overshirts", 1899, 2199, "15% OFF", 4.8, "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=85", List.of("Black", "Olive"), List.of("M", "L", "XL"), 80))); }; }
}
