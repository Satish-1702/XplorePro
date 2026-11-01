package com.icestore.controller;

import java.time.Instant;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import com.icestore.model.User;
import com.icestore.repository.UserRepository;
import com.icestore.security.JwtService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@RestController @RequestMapping("/api/auth")
public class AuthController {
  private final UserRepository users; private final PasswordEncoder encoder; private final JwtService jwt;
  public AuthController(UserRepository users, PasswordEncoder encoder, JwtService jwt) { this.users = users; this.encoder = encoder; this.jwt = jwt; }
  public record Credentials(String name, @Email @NotBlank String email, @NotBlank String password) {}
  public record AuthResponse(String token, String id, String name, String email, String role) {}
  @PostMapping("/register") AuthResponse register(@Valid @RequestBody Credentials input) { if (input.name() == null || input.name().isBlank()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Name is required"); if (users.findByEmailIgnoreCase(input.email()).isPresent()) throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered"); User u = users.save(new User(null, input.name(), input.email().toLowerCase(), encoder.encode(input.password()), "USER", List.of(), Instant.now())); return response(u); }
  @PostMapping("/login") AuthResponse login(@RequestBody Credentials input) { User u = users.findByEmailIgnoreCase(input.email()).filter(x -> encoder.matches(input.password(), x.password())).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password")); return response(u); }
  private AuthResponse response(User u) { return new AuthResponse(jwt.create(u.id(), u.email(), u.role()), u.id(), u.name(), u.email(), u.role()); }
}
