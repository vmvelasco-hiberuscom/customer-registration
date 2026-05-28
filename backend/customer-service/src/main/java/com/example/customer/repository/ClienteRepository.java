package com.example.customer.repository;

import com.example.customer.domain.Cliente;
import com.example.customer.domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    boolean existsByCustomer(Customer customer);

    @Query("SELECT c FROM Cliente c JOIN FETCH c.customer JOIN FETCH c.envio ORDER BY c.clienteId ASC")
    List<Cliente> findAllWithDetails();
}
