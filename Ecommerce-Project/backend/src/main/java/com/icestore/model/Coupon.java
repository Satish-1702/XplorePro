package com.icestore.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("coupons")
public record Coupon(@Id String id, String code, int percentage, int minimumOrder, boolean active) {}
