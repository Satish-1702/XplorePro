package com.icestore.controller;

import org.springframework.web.bind.annotation.*;
import com.icestore.model.Coupon;
import com.icestore.repository.CouponRepository;

@RestController @RequestMapping("/api/coupons")
public class CouponController {
  private final CouponRepository coupons;
  public CouponController(CouponRepository coupons) { this.coupons = coupons; }
  @GetMapping("/{code}") Coupon get(@PathVariable String code) { return coupons.findByCodeIgnoreCaseAndActiveTrue(code).orElseThrow(() -> new java.util.NoSuchElementException("Coupon not found")); }
  @PostMapping @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')") Coupon create(@RequestBody Coupon coupon) { return coupons.save(coupon); }
}
