package com.grooveplayer.api.controller;

import com.grooveplayer.api.model.User;
import com.grooveplayer.api.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        return authService.login(request.getEmail(), request.getPassword())
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.badRequest().build());
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        return authService.register(request.getName(), request.getEmail(), request.getPassword())
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.badRequest().build());
    }
}