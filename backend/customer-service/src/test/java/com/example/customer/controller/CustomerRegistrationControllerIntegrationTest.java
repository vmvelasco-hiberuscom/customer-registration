package com.example.customer.controller;

import com.example.customer.dto.CustomerData;
import com.example.customer.dto.CustomerRegistrationRequest;
import com.example.customer.dto.RegistrationResponse;
import com.example.customer.service.CustomerRegistrationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = CustomerRegistrationController.class)
@AutoConfigureMockMvc(addFilters = false)
class CustomerRegistrationControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private CustomerRegistrationService customerRegistrationService;

    @Test
    void registerReturns201ForSuccessfulRegistration() throws Exception {
        RegistrationResponse success = RegistrationResponse.success(CustomerData.builder()
            .customerId(UUID.randomUUID())
            .email("user@example.com")
            .createdAt(LocalDateTime.now())
            .build());

        when(customerRegistrationService.register(any(CustomerRegistrationRequest.class), eq("127.0.0.1")))
            .thenReturn(success);

        CustomerRegistrationRequest request = CustomerRegistrationRequest.builder()
            .email("user@example.com")
            .firstName("John")
            .lastName("Doe")
            .password("Strong1!")
            .build();

        mockMvc.perform(post("/api/v1/customers/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.status").value("success"));
    }

    @Test
    void registerReturns400ForDuplicateEmail() throws Exception {
        RegistrationResponse duplicate = RegistrationResponse.error(
            "DUPLICATE_EMAIL",
            "This email is already registered. Try logging in or use password recovery."
        );

        when(customerRegistrationService.register(any(CustomerRegistrationRequest.class), eq("127.0.0.1")))
            .thenReturn(duplicate);

        CustomerRegistrationRequest request = CustomerRegistrationRequest.builder()
            .email("user@example.com")
            .firstName("John")
            .lastName("Doe")
            .password("Strong1!")
            .build();

        mockMvc.perform(post("/api/v1/customers/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.error.errorCode").value("DUPLICATE_EMAIL"));
    }

    @Test
    void registerReturns429ForRateLimitErrors() throws Exception {
        RegistrationResponse limited = RegistrationResponse.error("RATE_LIMIT_IP", "Too many attempts from same IP");

        when(customerRegistrationService.register(any(CustomerRegistrationRequest.class), eq("127.0.0.1")))
            .thenReturn(limited);

        CustomerRegistrationRequest request = CustomerRegistrationRequest.builder()
            .email("user@example.com")
            .firstName("John")
            .lastName("Doe")
            .password("Strong1!")
            .build();

        mockMvc.perform(post("/api/v1/customers/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isTooManyRequests())
            .andExpect(jsonPath("$.error.errorCode").value("RATE_LIMIT_IP"));
    }
}
