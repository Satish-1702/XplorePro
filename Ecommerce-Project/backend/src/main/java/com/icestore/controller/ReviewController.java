package com.icestore.controller;

import java.time.Instant;
import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.icestore.model.Review;
import com.icestore.repository.ReviewRepository;

@RestController @RequestMapping("/api/products/{productId}/reviews")
public class ReviewController {
  private final ReviewRepository reviews;
  public ReviewController(ReviewRepository reviews) { this.reviews = reviews; }
  @GetMapping List<Review> list(@PathVariable String productId) { return reviews.findByProductIdOrderByCreatedAtDesc(productId); }
  @PostMapping Review create(Authentication auth, @PathVariable String productId, @RequestBody Review review) { if (review.rating() < 1 || review.rating() > 5) throw new IllegalArgumentException("Rating must be between 1 and 5"); return reviews.save(new Review(null, productId, auth.getName(), review.author(), review.rating(), review.comment(), Instant.now())); }
}
