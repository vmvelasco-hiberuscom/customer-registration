package com.example.customer.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IncidenciaUpdateRequest {

    @NotBlank
    private String tipo;

    @NotBlank
    private String estado;

    @NotBlank
    private String descripcion;
}
