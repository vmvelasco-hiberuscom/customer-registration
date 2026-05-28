package com.example.customer.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordHashingService {

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

    public String hash(String plainPassword) {
        return passwordEncoder.encode(plainPassword);
    }

    public boolean verify(String plainPassword, String hash) {
        return passwordEncoder.matches(plainPassword, hash);
    }
}
