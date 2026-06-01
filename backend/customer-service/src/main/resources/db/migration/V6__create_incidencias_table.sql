CREATE TABLE incidencias (
    incidencia_id    NUMBER(19,0) GENERATED ALWAYS AS IDENTITY NOT NULL,
    envio_id         NUMBER(19,0) NOT NULL,
    tipo             VARCHAR2(30) NOT NULL,
    estado           VARCHAR2(30) DEFAULT 'abierta' NOT NULL,
    descripcion      VARCHAR2(1000) NOT NULL,
    fecha_incidencia TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT pk_incidencias PRIMARY KEY (incidencia_id),
    CONSTRAINT fk_incidencias_envio FOREIGN KEY (envio_id)
        REFERENCES envios(envio_id) ON DELETE CASCADE,
    CONSTRAINT chk_incidencias_tipo
        CHECK (tipo IN ('incidencia', 'reclamacion')),
    CONSTRAINT chk_incidencias_estado
        CHECK (estado IN ('abierta', 'en revision', 'resuelta', 'cerrada'))
);

CREATE INDEX idx_incidencias_envio
    ON incidencias (envio_id);

CREATE INDEX idx_incidencias_estado_fecha
    ON incidencias (estado, fecha_incidencia DESC);
