package com.icestore.model;

import java.time.Instant;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
public record User(@Id String id, String name, String email, String password, String role, List<String> wishlist, Instant createdAt) {}
