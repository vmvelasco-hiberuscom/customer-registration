ALTER TABLE envios ADD (
    direccion_envio VARCHAR2(255),
    codigo_postal VARCHAR2(20),
    pais VARCHAR2(100)
);

UPDATE envios
SET direccion_envio = NVL(direccion_envio, 'Pendiente de informar'),
    codigo_postal = NVL(codigo_postal, '00000'),
    pais = NVL(pais, 'Pendiente');

ALTER TABLE envios MODIFY (
    direccion_envio VARCHAR2(255) NOT NULL,
    codigo_postal VARCHAR2(20) NOT NULL,
    pais VARCHAR2(100) NOT NULL
);