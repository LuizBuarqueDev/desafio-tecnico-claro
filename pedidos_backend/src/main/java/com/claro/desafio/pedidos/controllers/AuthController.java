package com.claro.desafio.pedidos.controllers;

import com.claro.desafio.pedidos.dtos.AuthResponseDTO;
import com.claro.desafio.pedidos.dtos.LoginRequestDTO;
import com.claro.desafio.pedidos.dtos.RegisterRequestDTO;
import com.claro.desafio.pedidos.security.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Auth",
        description = "Operations related to authentication")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/resgister")
    @Operation(summary = "Register a new user")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody @Valid RegisterRequestDTO request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    @Operation(summary = "Login a user")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody @Valid LoginRequestDTO request) {
        return ResponseEntity.ok(authService.login(request));
    }
}