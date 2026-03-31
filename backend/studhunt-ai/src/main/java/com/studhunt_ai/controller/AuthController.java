package com.studhunt_ai.controller;


import com.studhunt_ai.dto.AuthRequest;
import com.studhunt_ai.dto.AuthResponse;
import com.studhunt_ai.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody AuthRequest request) {
        String message = authService.register(request);
        return new AuthResponse(message);
    }
    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        String message = authService.login(request);
        return new AuthResponse(message);
    }
}