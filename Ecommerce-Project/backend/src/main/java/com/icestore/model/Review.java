package com.icestore.model;

import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("reviews")
public record Review(@Id String id, String productId, String userId, String author, int rating, String comment, Instant createdAt) {}
