package com.example.customer.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnvioCreateRequest {

    @NotNull
    private UUID customerId;

    @NotNull
    private Long productId;
}
