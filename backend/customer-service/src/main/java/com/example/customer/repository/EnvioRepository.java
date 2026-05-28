package com.example.customer.repository;

import com.example.customer.domain.Envio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EnvioRepository extends JpaRepository<Envio, Long> {

    @Query("SELECT e FROM Envio e JOIN FETCH e.customer JOIN FETCH e.product ORDER BY e.envioId DESC")
    List<Envio> findAllWithDetails();
}
