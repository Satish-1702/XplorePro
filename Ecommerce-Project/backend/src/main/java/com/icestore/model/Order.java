package com.icestore.model;

import java.time.Instant;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("orders")
public record Order(@Id String id, String userId, List<Item> items, int subtotal, int discount, int delivery, int total, String paymentMethod, String status, String shippingAddress, Instant createdAt) {
  public record Item(String productId, String name, int price, int quantity, String size, String color) {}
}
