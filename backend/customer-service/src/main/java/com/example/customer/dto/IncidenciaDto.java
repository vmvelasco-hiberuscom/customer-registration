package com.example.customer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IncidenciaDto {
    private Long incidenciaId;
    private Long envioId;
    private String tipo;
    private String estado;
    private String descripcion;
    private LocalDateTime fechaIncidencia;
}
