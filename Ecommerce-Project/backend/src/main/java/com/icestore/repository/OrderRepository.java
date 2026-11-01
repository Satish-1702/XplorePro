package com.icestore.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.icestore.model.Order;

public interface OrderRepository extends MongoRepository<Order, String> { List<Order> findByUserIdOrderByCreatedAtDesc(String userId); }
