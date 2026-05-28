package com.example.customer.controller;

import com.example.customer.dto.EnvioCreateRequest;
import com.example.customer.dto.EnvioDto;
import com.example.customer.service.EnvioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/envios")
@RequiredArgsConstructor
public class EnvioController {

    private final EnvioService envioService;

    @GetMapping
    public ResponseEntity<List<EnvioDto>> listEnvios() {
        return ResponseEntity.ok(envioService.listAll());
    }

    @PostMapping
    public ResponseEntity<EnvioDto> createEnvio(@Valid @RequestBody EnvioCreateRequest request) {
        return envioService.create(request)
                .map(dto -> ResponseEntity.status(HttpStatus.CREATED).body(dto))
                .orElse(ResponseEntity.badRequest().build());
    }
}
