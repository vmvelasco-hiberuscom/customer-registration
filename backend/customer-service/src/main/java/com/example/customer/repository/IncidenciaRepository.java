package com.example.customer.repository;

import com.example.customer.domain.Incidencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IncidenciaRepository extends JpaRepository<Incidencia, Long> {

    @Query("SELECT i FROM Incidencia i JOIN FETCH i.envio ORDER BY i.fechaIncidencia DESC, i.incidenciaId DESC")
    List<Incidencia> findAllWithEnvio();
}
