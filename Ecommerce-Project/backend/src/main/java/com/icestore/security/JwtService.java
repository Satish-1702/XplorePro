package com.icestore.security;

import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
  private final SecretKey key;
  public JwtService(@Value("${app.jwt-secret}") String secret) { key = Keys.hmacShaKeyFor(secret.getBytes()); }
  public String create(String userId, String email, String role) { return Jwts.builder().subject(userId).claim("email", email).claim("role", role).issuedAt(new Date()).expiration(new Date(System.currentTimeMillis() + 86400000L)).signWith(key).compact(); }
  public io.jsonwebtoken.Claims parse(String token) { return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload(); }
}
