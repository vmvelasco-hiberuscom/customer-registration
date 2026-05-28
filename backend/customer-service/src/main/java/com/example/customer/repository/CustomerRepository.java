package com.example.customer.repository;

import com.example.customer.domain.Customer;
import com.example.customer.domain.enums.CustomerStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CustomerRepository extends JpaRepository<Customer, UUID> {

    boolean existsByEmailIgnoreCaseAndStatus(String email, CustomerStatus status);

    Optional<Customer> findByEmailIgnoreCase(String email);

    List<Customer> findAllByStatusOrderByRegistrationDateDesc(CustomerStatus status);

    @Query("""
        SELECT COUNT(c) FROM Customer c
        WHERE c.ipAddressRegistered = :ipAddress
          AND c.registrationDate > :since
          AND c.status = com.example.customer.domain.enums.CustomerStatus.ACTIVE
        """)
    long countRecentRegistrationsByIp(@Param("ipAddress") String ipAddress, @Param("since") LocalDateTime since);

    @Query(value = """
        SELECT COUNT(*) FROM customers c
        WHERE SUBSTR(LOWER(c.email), INSTR(LOWER(c.email), '@') + 1) = :emailDomain
          AND c.registration_date > :since
          AND c.status = 'active'
        """, nativeQuery = true)
    long countRecentRegistrationsByDomain(@Param("emailDomain") String emailDomain, @Param("since") LocalDateTime since);
}
