package com.icestore.model;

import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("products")
public record Product(@Id String id, String name, String category, int price, Integer oldPrice, String tag, double rating, String image, List<String> colors, List<String> sizes, int stock) {}
