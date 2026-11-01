package com.icestore.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.icestore.model.Product;

public interface ProductRepository extends MongoRepository<Product, String> { List<Product> findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(String name, String category); }
