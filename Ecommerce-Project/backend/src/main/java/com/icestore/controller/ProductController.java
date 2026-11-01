package com.icestore.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.icestore.model.Product;
import com.icestore.repository.ProductRepository;

@RestController @RequestMapping("/api/products")
public class ProductController {
  private final ProductRepository products; public ProductController(ProductRepository products) { this.products = products; }
  @GetMapping List<Product> list(@RequestParam(required = false) String search) { return search == null || search.isBlank() ? products.findAll() : products.findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(search, search); }
  @GetMapping("/{id}") Product get(@PathVariable String id) { return products.findById(id).orElseThrow(); }
  @PostMapping @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')") Product create(@RequestBody Product product) { return products.save(product); }
  @PutMapping("/{id}") @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')") Product update(@PathVariable String id, @RequestBody Product product) { return products.save(new Product(id, product.name(), product.category(), product.price(), product.oldPrice(), product.tag(), product.rating(), product.image(), product.colors(), product.sizes(), product.stock())); }
  @DeleteMapping("/{id}") @org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')") void delete(@PathVariable String id) { products.deleteById(id); }
}
