package com.icestore.controller;

import java.time.Instant;
import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.icestore.model.Order;
import com.icestore.repository.OrderRepository;

@RestController @RequestMapping("/api/orders")
public class OrderController {
  private final OrderRepository orders; public OrderController(OrderRepository orders) { this.orders = orders; }
  @GetMapping List<Order> mine(Authentication auth) { return orders.findByUserIdOrderByCreatedAtDesc(auth.getName()); }
  @PostMapping Order create(Authentication auth, @RequestBody Order order) { return orders.save(new Order(null, auth.getName(), order.items(), order.subtotal(), order.discount(), order.delivery(), order.total(), order.paymentMethod(), "PLACED", order.shippingAddress(), Instant.now())); }
  @PatchMapping("/{id}/status") @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')") Order status(@PathVariable String id, @RequestParam String value) { Order o = orders.findById(id).orElseThrow(); return orders.save(new Order(o.id(), o.userId(), o.items(), o.subtotal(), o.discount(), o.delivery(), o.total(), o.paymentMethod(), value, o.shippingAddress(), o.createdAt())); }
}
