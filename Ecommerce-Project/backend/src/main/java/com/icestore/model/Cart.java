package com.icestore.model;

import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("carts")
public record Cart(@Id String id, String userId, List<Item> items) {
  public record Item(String productId, String name, int price, int quantity, String size, String color, String image) {}
}
