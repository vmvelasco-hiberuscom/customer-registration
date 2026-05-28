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
public class EnvioDto {
    private Long envioId;
    private String customerId;
    private String customerNombre;
    private Long productId;
    private String productNombre;
    private LocalDateTime fechaEnvio;
    private String estado;
}
