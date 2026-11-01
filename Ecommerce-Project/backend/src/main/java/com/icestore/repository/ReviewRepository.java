package com.icestore.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.icestore.model.Review;

public interface ReviewRepository extends MongoRepository<Review, String> { List<Review> findByProductIdOrderByCreatedAtDesc(String productId); }
