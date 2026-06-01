package com.example.customer.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnvioUpdateRequest {

    @NotBlank
    private String direccionEnvio;

    @NotBlank
    private String codigoPostal;

    @NotBlank
    private String pais;

    @NotBlank
    private String estado;
}