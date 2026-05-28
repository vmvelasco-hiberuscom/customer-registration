package com.example.customer.service;

import com.example.customer.repository.CustomerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RateLimitingServiceTest {

    @Mock
    private CustomerRepository customerRepository;

    private RateLimitingService service;

    @BeforeEach
    void setUp() {
        service = new RateLimitingService(customerRepository);
    }

    @Test
    void ipLimitIsExceededWhenCountReachesThreshold() {
        when(customerRepository.countRecentRegistrationsByIp(eq("127.0.0.1"), any())).thenReturn(10L);

        assertTrue(service.isExceededIpLimit("127.0.0.1"));
    }

    @Test
    void domainLimitIsNotExceededWhenCountIsBelowThreshold() {
        when(customerRepository.countRecentRegistrationsByDomain(eq("example.com"), any())).thenReturn(4L);

        assertFalse(service.isExceededDomainLimit("example.com"));
    }
}
