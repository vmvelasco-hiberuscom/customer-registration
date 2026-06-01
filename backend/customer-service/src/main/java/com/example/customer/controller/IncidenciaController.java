package com.example.customer.controller;

import com.example.customer.dto.IncidenciaCreateRequest;
import com.example.customer.dto.IncidenciaDto;
import com.example.customer.dto.IncidenciaUpdateRequest;
import com.example.customer.service.IncidenciaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/incidencias")
@RequiredArgsConstructor
public class IncidenciaController {

    private final IncidenciaService incidenciaService;

    @GetMapping
    public ResponseEntity<List<IncidenciaDto>> listIncidencias() {
        return ResponseEntity.ok(incidenciaService.listAll());
    }

    @PostMapping
    public ResponseEntity<IncidenciaDto> createIncidencia(@Valid @RequestBody IncidenciaCreateRequest request) {
        return incidenciaService.create(request)
                .map(dto -> ResponseEntity.status(HttpStatus.CREATED).body(dto))
                .orElse(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{incidenciaId}")
    public ResponseEntity<IncidenciaDto> updateIncidencia(@PathVariable Long incidenciaId,
                                                          @Valid @RequestBody IncidenciaUpdateRequest request) {
        return incidenciaService.update(incidenciaId, request)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{incidenciaId}")
    public ResponseEntity<Void> deleteIncidencia(@PathVariable Long incidenciaId) {
        if (incidenciaService.delete(incidenciaId)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
