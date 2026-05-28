package com.example.customer.service;

import com.example.customer.domain.Customer;
import com.example.customer.domain.enums.CustomerStatus;
import com.example.customer.dto.CustomerRegistrationRequest;
import com.example.customer.dto.RegistrationResponse;
import com.example.customer.repository.AuditLogRepository;
import com.example.customer.repository.CustomerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CustomerRegistrationServiceTest {

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private AuditLogRepository auditLogRepository;

    @Mock
    private RateLimitingService rateLimitingService;

    @Mock
    private PasswordHashingService passwordHashingService;

    @Mock
    private EmailValidationService emailValidationService;

    private CustomerRegistrationService service;

    @BeforeEach
    void setUp() {
        service = new CustomerRegistrationService(
            customerRepository,
            auditLogRepository,
            rateLimitingService,
            passwordHashingService,
            emailValidationService
        );
    }

    @Test
    void registerReturnsSuccessWhenInputIsValid() {
        CustomerRegistrationRequest request = CustomerRegistrationRequest.builder()
            .email("user@example.com")
            .firstName("Test")
            .lastName("User")
            .password("Strong1!")
            .build();

        when(emailValidationService.isValid("user@example.com")).thenReturn(true);
        when(rateLimitingService.isExceededIpLimit("127.0.0.1")).thenReturn(false);
        when(rateLimitingService.isExceededDomainLimit("example.com")).thenReturn(false);
        when(customerRepository.existsByEmailIgnoreCaseAndStatus("user@example.com", CustomerStatus.ACTIVE)).thenReturn(false);
        when(passwordHashingService.hash("Strong1!")).thenReturn("hashed-password");
        when(customerRepository.save(any(Customer.class))).thenAnswer(invocation -> {
            Customer customer = invocation.getArgument(0, Customer.class);
            customer.setRegistrationDate(LocalDateTime.now());
            return customer;
        });

        RegistrationResponse response = service.register(request, "127.0.0.1");

        assertEquals("success", response.getStatus());
        assertNotNull(response.getData());
        assertEquals("user@example.com", response.getData().getEmail());
        assertNull(response.getError());
        verify(customerRepository).save(any(Customer.class));
        verify(auditLogRepository).save(any());
    }

    @Test
    void registerReturnsDuplicateEmailWhenAddressAlreadyExists() {
        CustomerRegistrationRequest request = CustomerRegistrationRequest.builder()
            .email("user@example.com")
            .firstName("Test")
            .lastName("User")
            .password("Strong1!")
            .build();

        when(emailValidationService.isValid("user@example.com")).thenReturn(true);
        when(rateLimitingService.isExceededIpLimit("127.0.0.1")).thenReturn(false);
        when(rateLimitingService.isExceededDomainLimit("example.com")).thenReturn(false);
        when(customerRepository.existsByEmailIgnoreCaseAndStatus("user@example.com", CustomerStatus.ACTIVE)).thenReturn(true);

        RegistrationResponse response = service.register(request, "127.0.0.1");

        assertEquals("error", response.getStatus());
        assertEquals("DUPLICATE_EMAIL", response.getError().getErrorCode());
        verify(customerRepository, never()).save(any(Customer.class));
        verify(auditLogRepository).save(any());
    }

    @Test
    void registerReturnsRateLimitIpWhenIpThresholdExceeded() {
        CustomerRegistrationRequest request = CustomerRegistrationRequest.builder()
            .email("user@example.com")
            .firstName("Test")
            .lastName("User")
            .password("Strong1!")
            .build();

        when(emailValidationService.isValid("user@example.com")).thenReturn(true);
        when(rateLimitingService.isExceededIpLimit("127.0.0.1")).thenReturn(true);

        RegistrationResponse response = service.register(request, "127.0.0.1");

        assertEquals("error", response.getStatus());
        assertEquals("RATE_LIMIT_IP", response.getError().getErrorCode());
        verify(customerRepository, never()).save(any(Customer.class));
        verify(auditLogRepository).save(any());
    }
}
