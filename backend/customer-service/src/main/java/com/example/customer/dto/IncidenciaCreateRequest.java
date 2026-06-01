package com.example.customer.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IncidenciaCreateRequest {

    @NotNull
    private Long envioId;

    @NotBlank
    private String tipo;

    @NotBlank
    private String estado;

    @NotBlank
    private String descripcion;
}
