package com.example.customer.service;

import com.example.customer.domain.AuditLog;
import com.example.customer.domain.Customer;
import com.example.customer.domain.enums.AuditAction;
import com.example.customer.domain.enums.AuditStatus;
import com.example.customer.domain.enums.CustomerStatus;
import com.example.customer.dto.CustomerData;
import com.example.customer.dto.CustomerRegistrationRequest;
import com.example.customer.dto.RegistrationResponse;
import com.example.customer.repository.AuditLogRepository;
import com.example.customer.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerRegistrationService {

    private final CustomerRepository customerRepository;
    private final AuditLogRepository auditLogRepository;
    private final RateLimitingService rateLimitingService;
    private final PasswordHashingService passwordHashingService;
    private final EmailValidationService emailValidationService;

    @Transactional(isolation = Isolation.READ_COMMITTED)
    public RegistrationResponse register(CustomerRegistrationRequest request, String ipAddress) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();

        if (!emailValidationService.isValid(normalizedEmail)) {
            persistFailureAudit(normalizedEmail, ipAddress, "VALIDATION_ERROR");
            return RegistrationResponse.error("VALIDATION_ERROR", "Invalid email format");
        }

        if (rateLimitingService.isExceededIpLimit(ipAddress)) {
            persistFailureAudit(normalizedEmail, ipAddress, "RATE_LIMIT_IP");
            return RegistrationResponse.error("RATE_LIMIT_IP", "Too many attempts from same IP");
        }

        String domain = normalizedEmail.substring(normalizedEmail.indexOf('@') + 1);
        if (rateLimitingService.isExceededDomainLimit(domain)) {
            persistFailureAudit(normalizedEmail, ipAddress, "RATE_LIMIT_DOMAIN");
            return RegistrationResponse.error("RATE_LIMIT_DOMAIN", "Too many attempts from same domain");
        }

        if (customerRepository.existsByEmailIgnoreCaseAndStatus(normalizedEmail, CustomerStatus.ACTIVE)) {
            persistFailureAudit(normalizedEmail, ipAddress, "DUPLICATE_EMAIL");
            return RegistrationResponse.error("DUPLICATE_EMAIL", "Email already registered");
        }

        Customer customer = Customer.builder()
            .customerId(UUID.randomUUID())
            .email(normalizedEmail)
            .firstName(request.getFirstName())
            .lastName(request.getLastName())
            .passwordHash(passwordHashingService.hash(request.getPassword()))
            .status(CustomerStatus.ACTIVE)
            .registrationDate(LocalDateTime.now())
            .ipAddressRegistered(ipAddress)
            .build();

        Customer saved = customerRepository.save(customer);

        auditLogRepository.save(AuditLog.builder()
            .logTimestamp(LocalDateTime.now())
            .action(AuditAction.CUSTOMER_REGISTERED)
            .status(AuditStatus.SUCCESS)
            .emailHash(hashEmail(normalizedEmail))
            .ipAddress(ipAddress)
            .customer(saved)
            .build());

        return RegistrationResponse.success(CustomerData.builder()
            .customerId(saved.getCustomerId())
            .email(saved.getEmail())
            .createdAt(saved.getRegistrationDate())
            .build());
    }

    private void persistFailureAudit(String email, String ipAddress, String reason) {
        auditLogRepository.save(AuditLog.builder()
            .logTimestamp(LocalDateTime.now())
            .action(AuditAction.REGISTRATION_FAILED)
            .status(AuditStatus.FAILED)
            .failureReason(reason)
            .emailHash(hashEmail(email))
            .ipAddress(ipAddress)
            .build());
    }

    private String hashEmail(String email) {
        return DigestUtils.sha256Hex(email);
    }
}
