package com.sweetshop.auth.controller;

import com.sweetshop.auth.dto.AuthRequest;
import com.sweetshop.auth.dto.AuthResponse;
import com.sweetshop.auth.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {

        authService.register(
            request.getUsername(),
            request.getPassword(),
            request.getRole()  
        );

        return ResponseEntity.ok("User registered");
    }


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        String token = authService.login(request.getUsername(), request.getPassword());
        return ResponseEntity.ok(new AuthResponse(token));
    }
}
