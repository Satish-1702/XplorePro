package com.icestore.controller;

import java.util.Map;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

@RestControllerAdvice
public class ApiExceptionHandler {
  @ExceptionHandler(ResponseStatusException.class)
  Map<String, String> status(ResponseStatusException ex) { return Map.of("error", ex.getReason() == null ? "Request failed" : ex.getReason()); }
  @ExceptionHandler({IllegalArgumentException.class, java.util.NoSuchElementException.class})
  Map<String, String> invalid(RuntimeException ex) { return Map.of("error", ex.getMessage() == null ? "Invalid request" : ex.getMessage()); }
}
