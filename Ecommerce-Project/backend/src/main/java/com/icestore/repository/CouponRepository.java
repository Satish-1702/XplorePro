package com.icestore.repository;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.icestore.model.Coupon;

public interface CouponRepository extends MongoRepository<Coupon, String> { Optional<Coupon> findByCodeIgnoreCaseAndActiveTrue(String code); }
