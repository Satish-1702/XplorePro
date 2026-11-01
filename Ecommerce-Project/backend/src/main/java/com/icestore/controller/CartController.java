package com.icestore.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.icestore.model.Cart;
import com.icestore.repository.CartRepository;

@RestController @RequestMapping("/api/cart")
public class CartController {
  private final CartRepository carts;
  public CartController(CartRepository carts) { this.carts = carts; }
  @GetMapping Cart get(Authentication auth) { return carts.findByUserId(auth.getName()).orElseGet(() -> carts.save(new Cart(null, auth.getName(), java.util.List.of()))); }
  @PutMapping Cart replace(Authentication auth, @RequestBody Cart cart) { Cart existing = carts.findByUserId(auth.getName()).orElse(new Cart(null, auth.getName(), java.util.List.of())); return carts.save(new Cart(existing.id(), auth.getName(), cart.items())); }
}
