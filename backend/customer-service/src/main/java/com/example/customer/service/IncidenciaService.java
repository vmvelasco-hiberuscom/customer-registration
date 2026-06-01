package com.example.customer.service;

import com.example.customer.domain.Envio;
import com.example.customer.domain.Incidencia;
import com.example.customer.dto.IncidenciaCreateRequest;
import com.example.customer.dto.IncidenciaDto;
import com.example.customer.dto.IncidenciaUpdateRequest;
import com.example.customer.repository.EnvioRepository;
import com.example.customer.repository.IncidenciaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class IncidenciaService {

    private final IncidenciaRepository incidenciaRepository;
    private final EnvioRepository envioRepository;

    @Transactional(readOnly = true)
    public List<IncidenciaDto> listAll() {
        return incidenciaRepository.findAllWithEnvio()
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional
    public Optional<IncidenciaDto> create(IncidenciaCreateRequest request) {
        Optional<Envio> envioOpt = envioRepository.findById(request.getEnvioId());
        if (envioOpt.isEmpty()) {
            return Optional.empty();
        }

        Incidencia incidencia = Incidencia.builder()
                .envio(envioOpt.get())
                .tipo(normalize(request.getTipo()))
                .estado(normalize(request.getEstado()))
                .descripcion(request.getDescripcion().trim())
                .fechaIncidencia(java.time.LocalDateTime.now())
                .build();

        return Optional.of(toDto(incidenciaRepository.save(incidencia)));
    }

    @Transactional
    public Optional<IncidenciaDto> update(Long incidenciaId, IncidenciaUpdateRequest request) {
        Optional<Incidencia> incidenciaOpt = incidenciaRepository.findById(incidenciaId);
        if (incidenciaOpt.isEmpty()) {
            return Optional.empty();
        }

        Incidencia incidencia = incidenciaOpt.get();
        incidencia.setTipo(normalize(request.getTipo()));
        incidencia.setEstado(normalize(request.getEstado()));
        incidencia.setDescripcion(request.getDescripcion().trim());

        return Optional.of(toDto(incidenciaRepository.save(incidencia)));
    }

    @Transactional
    public boolean delete(Long incidenciaId) {
        if (!incidenciaRepository.existsById(incidenciaId)) {
            return false;
        }
        incidenciaRepository.deleteById(incidenciaId);
        return true;
    }

    private IncidenciaDto toDto(Incidencia i) {
        return IncidenciaDto.builder()
                .incidenciaId(i.getIncidenciaId())
                .envioId(i.getEnvio().getEnvioId())
                .tipo(i.getTipo())
                .estado(i.getEstado())
                .descripcion(i.getDescripcion())
                .fechaIncidencia(i.getFechaIncidencia())
                .build();
    }

    private String normalize(String value) {
        return value == null ? null : value.trim().toLowerCase(Locale.ROOT);
    }
}
