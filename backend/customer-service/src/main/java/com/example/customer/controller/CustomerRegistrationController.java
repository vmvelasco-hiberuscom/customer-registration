package com.example.customer.controller;

import com.example.customer.dto.CustomerRegistrationRequest;
import com.example.customer.dto.RegistrationResponse;
import com.example.customer.service.CustomerRegistrationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/customers")
@RequiredArgsConstructor
public class CustomerRegistrationController {

    private final CustomerRegistrationService registrationService;

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponse> register(
        @Valid @RequestBody CustomerRegistrationRequest request,
        HttpServletRequest httpServletRequest
    ) {
        String clientIp = extractClientIp(httpServletRequest);
        RegistrationResponse response = registrationService.register(request, clientIp);

        if (!"error".equals(response.getStatus())) {
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }

        String errorCode = response.getError() != null ? response.getError().getErrorCode() : "INTERNAL_SERVER_ERROR";
        HttpStatus status = switch (errorCode) {
            case "RATE_LIMIT_IP", "RATE_LIMIT_DOMAIN" -> HttpStatus.TOO_MANY_REQUESTS;
            case "VALIDATION_ERROR", "DUPLICATE_EMAIL" -> HttpStatus.BAD_REQUEST;
            default -> HttpStatus.INTERNAL_SERVER_ERROR;
        };

        return ResponseEntity.status(status).body(response);
    }

    private String extractClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isBlank()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
