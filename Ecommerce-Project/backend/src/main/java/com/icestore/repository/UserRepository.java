package com.icestore.repository;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.icestore.model.User;

public interface UserRepository extends MongoRepository<User, String> { Optional<User> findByEmailIgnoreCase(String email); }
