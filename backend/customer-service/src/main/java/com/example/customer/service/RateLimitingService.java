package com.example.customer.service;

import com.example.customer.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RateLimitingService {

    private static final int IP_LIMIT = 10;
    private static final int DOMAIN_LIMIT = 5;

    private final CustomerRepository customerRepository;

    public boolean isExceededIpLimit(String ipAddress) {
        LocalDateTime since = LocalDateTime.now().minusMinutes(10);
        return customerRepository.countRecentRegistrationsByIp(ipAddress, since) >= IP_LIMIT;
    }

    public boolean isExceededDomainLimit(String emailDomain) {
        LocalDateTime since = LocalDateTime.now().minusMinutes(30);
        return customerRepository.countRecentRegistrationsByDomain(emailDomain, since) >= DOMAIN_LIMIT;
    }
}
