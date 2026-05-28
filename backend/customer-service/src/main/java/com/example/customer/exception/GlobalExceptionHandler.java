package com.example.customer.exception;

import com.example.customer.dto.RegistrationResponse;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<RegistrationResponse> handleValidationException(MethodArgumentNotValidException ex) {
        FieldError fieldError = ex.getBindingResult().getFieldError();
        String message = fieldError != null ? fieldError.getDefaultMessage() : "Request validation failed";
        RegistrationResponse response = RegistrationResponse.error("VALIDATION_ERROR", message);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<RegistrationResponse> handleDataIntegrityException(DataIntegrityViolationException ex) {
        String message = ex.getMostSpecificCause() != null ? ex.getMostSpecificCause().getMessage() : "Database error";
        if (message != null && message.toUpperCase().contains("UQ_CUSTOMERS_ACTIVE_EMAIL")) {
            RegistrationResponse response = RegistrationResponse.error(
                "DUPLICATE_EMAIL",
                "This email is already registered. Try logging in or use password recovery."
            );
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        RegistrationResponse response = RegistrationResponse.error("DB_ERROR", "An unexpected database error occurred.");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<RegistrationResponse> handleGenericException() {
        RegistrationResponse response = RegistrationResponse.error(
            "INTERNAL_SERVER_ERROR",
            "An unexpected error occurred. Please try again."
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
