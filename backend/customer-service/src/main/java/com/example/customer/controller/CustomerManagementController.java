package com.example.customer.controller;

import com.example.customer.dto.CustomerSummaryDto;
import com.example.customer.dto.CustomerUpdateRequest;
import com.example.customer.service.CustomerManagementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/customers")
@RequiredArgsConstructor
public class CustomerManagementController {

    private final CustomerManagementService managementService;

    @GetMapping
    public ResponseEntity<List<CustomerSummaryDto>> listCustomers() {
        return ResponseEntity.ok(managementService.listActiveCustomers());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<CustomerSummaryDto> updateCustomer(
        @PathVariable UUID id,
        @Valid @RequestBody CustomerUpdateRequest request
    ) {
        return managementService.updateCustomer(id, request)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable UUID id) {
        boolean deleted = managementService.deleteCustomer(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
