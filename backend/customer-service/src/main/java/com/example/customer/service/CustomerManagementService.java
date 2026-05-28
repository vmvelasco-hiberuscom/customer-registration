package com.example.customer.service;

import com.example.customer.domain.Customer;
import com.example.customer.domain.enums.CustomerStatus;
import com.example.customer.dto.CustomerSummaryDto;
import com.example.customer.dto.CustomerUpdateRequest;
import com.example.customer.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerManagementService {

    private final CustomerRepository customerRepository;

    public List<CustomerSummaryDto> listActiveCustomers() {
        return customerRepository
            .findAllByStatusOrderByRegistrationDateDesc(CustomerStatus.ACTIVE)
            .stream()
            .map(this::toDto)
            .toList();
    }

    @Transactional
    public Optional<CustomerSummaryDto> updateCustomer(UUID id, CustomerUpdateRequest request) {
        return customerRepository.findById(id).map(customer -> {
            customer.setFirstName(request.getFirstName());
            customer.setLastName(request.getLastName());
            return toDto(customerRepository.save(customer));
        });
    }

    @Transactional
    public boolean deleteCustomer(UUID id) {
        return customerRepository.findById(id).map(customer -> {
            customer.setStatus(CustomerStatus.DELETED);
            customer.setDeletedAt(LocalDateTime.now());
            customerRepository.save(customer);
            return true;
        }).orElse(false);
    }

    private CustomerSummaryDto toDto(Customer c) {
        return CustomerSummaryDto.builder()
            .customerId(c.getCustomerId())
            .email(c.getEmail())
            .firstName(c.getFirstName())
            .lastName(c.getLastName())
            .status(c.getStatus().name().toLowerCase())
            .registrationDate(c.getRegistrationDate())
            .build();
    }
}
