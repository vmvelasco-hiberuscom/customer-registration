package com.example.customer.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PasswordHashingServiceTest {

    private final PasswordHashingService service = new PasswordHashingService();

    @Test
    void hashProducesDifferentValueThanPlaintext() {
        String plain = "Strong1!";
        String hash = service.hash(plain);

        assertNotEquals(plain, hash);
        assertTrue(service.verify(plain, hash));
    }

    @Test
    void hashUsesSaltAndProducesDifferentOutputsForSameInput() {
        String plain = "Strong1!";
        String hashA = service.hash(plain);
        String hashB = service.hash(plain);

        assertNotEquals(hashA, hashB);
        assertTrue(service.verify(plain, hashA));
        assertTrue(service.verify(plain, hashB));
    }
}
