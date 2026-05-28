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
public class ClienteDto {
    private Long clienteId;
    private String customerId;
    private String customerNombre;
    private String email;
    private Long envioId;
    private LocalDateTime fechaAlta;
}
