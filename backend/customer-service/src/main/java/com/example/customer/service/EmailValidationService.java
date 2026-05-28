package com.example.customer.service;

import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class EmailValidationService {

    private static final Pattern SIMPLE_EMAIL_PATTERN = Pattern.compile(
        "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"
    );

    public boolean isValid(String email) {
        return email != null && SIMPLE_EMAIL_PATTERN.matcher(email).matches();
    }
}
