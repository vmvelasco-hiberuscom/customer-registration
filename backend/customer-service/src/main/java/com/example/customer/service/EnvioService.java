package com.example.customer.service;

import com.example.customer.domain.Cliente;
import com.example.customer.domain.Customer;
import com.example.customer.domain.Envio;
import com.example.customer.domain.Product;
import com.example.customer.dto.EnvioCreateRequest;
import com.example.customer.dto.EnvioDto;
import com.example.customer.repository.ClienteRepository;
import com.example.customer.repository.CustomerRepository;
import com.example.customer.repository.EnvioRepository;
import com.example.customer.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EnvioService {

    private final EnvioRepository envioRepository;
    private final ClienteRepository clienteRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;

    @Transactional(readOnly = true)
    public List<EnvioDto> listAll() {
        return envioRepository.findAllWithDetails().stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public Optional<EnvioDto> create(EnvioCreateRequest request) {
        Optional<Customer> customerOpt = customerRepository.findById(request.getCustomerId());
        Optional<Product> productOpt = productRepository.findById(request.getProductId());

        if (customerOpt.isEmpty() || productOpt.isEmpty()) {
            return Optional.empty();
        }

        Customer customer = customerOpt.get();
        Product product = productOpt.get();

        Envio envio = Envio.builder()
                .customer(customer)
                .product(product)
                .fechaEnvio(LocalDateTime.now())
                .estado("pendiente")
                .build();

        envio = envioRepository.save(envio);

        // Si el usuario aún no es cliente, se da de alta automáticamente
        if (!clienteRepository.existsByCustomer(customer)) {
            Cliente cliente = Cliente.builder()
                    .customer(customer)
                    .envio(envio)
                    .fechaAlta(LocalDateTime.now())
                    .build();
            clienteRepository.save(cliente);
        }

        return Optional.of(toDto(envio));
    }

    private EnvioDto toDto(Envio e) {
        return EnvioDto.builder()
                .envioId(e.getEnvioId())
                .customerId(e.getCustomer().getCustomerId().toString())
                .customerNombre(e.getCustomer().getFirstName() + " " + e.getCustomer().getLastName())
                .productId(e.getProduct().getProductId())
                .productNombre(e.getProduct().getNombre())
                .fechaEnvio(e.getFechaEnvio())
                .estado(e.getEstado())
                .build();
    }
}
