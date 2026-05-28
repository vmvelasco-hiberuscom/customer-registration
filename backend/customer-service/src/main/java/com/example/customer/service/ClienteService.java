package com.example.customer.service;

import com.example.customer.dto.ClienteDto;
import com.example.customer.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;

    @Transactional(readOnly = true)
    public List<ClienteDto> listAll() {
        return clienteRepository.findAllWithDetails().stream()
                .map(c -> ClienteDto.builder()
                        .clienteId(c.getClienteId())
                        .customerId(c.getCustomer().getCustomerId().toString())
                        .customerNombre(c.getCustomer().getFirstName() + " " + c.getCustomer().getLastName())
                        .email(c.getCustomer().getEmail())
                        .envioId(c.getEnvio().getEnvioId())
                        .fechaAlta(c.getFechaAlta())
                        .build())
                .toList();
    }
}
