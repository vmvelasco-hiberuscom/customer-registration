-- Limpieza defensiva (por si existe un objeto parcial de un intento anterior)
BEGIN EXECUTE IMMEDIATE 'DROP TABLE clientes CASCADE CONSTRAINTS'; EXCEPTION WHEN OTHERS THEN NULL; END;
/
BEGIN EXECUTE IMMEDIATE 'DROP TABLE envios CASCADE CONSTRAINTS'; EXCEPTION WHEN OTHERS THEN NULL; END;
/

CREATE TABLE envios (
    envio_id    NUMBER(19,0) GENERATED ALWAYS AS IDENTITY NOT NULL,
    customer_id RAW(16)      NOT NULL,
    product_id  NUMBER(19,0) NOT NULL,
    fecha_envio TIMESTAMP    DEFAULT CURRENT_TIMESTAMP NOT NULL,
    estado      VARCHAR2(30) DEFAULT 'pendiente'        NOT NULL,
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP  NOT NULL,
    updated_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP  NOT NULL,
    CONSTRAINT pk_envios            PRIMARY KEY (envio_id),
    CONSTRAINT fk_envios_customer   FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE,
    CONSTRAINT fk_envios_product    FOREIGN KEY (product_id)  REFERENCES products(product_id)   ON DELETE CASCADE,
    CONSTRAINT chk_envios_estado    CHECK (estado IN ('pendiente', 'enviado', 'entregado', 'cancelado'))
);

CREATE INDEX idx_envios_customer ON envios (customer_id);
CREATE INDEX idx_envios_product  ON envios (product_id);
CREATE INDEX idx_envios_estado   ON envios (estado, fecha_envio DESC);

CREATE TABLE clientes (
    cliente_id  NUMBER(19,0) GENERATED ALWAYS AS IDENTITY NOT NULL,
    customer_id RAW(16)      NOT NULL,
    envio_id    NUMBER(19,0) NOT NULL,
    fecha_alta  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT pk_clientes          PRIMARY KEY (cliente_id),
    CONSTRAINT uq_clientes_customer UNIQUE (customer_id),
    CONSTRAINT fk_clientes_customer FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE,
    CONSTRAINT fk_clientes_envio    FOREIGN KEY (envio_id)    REFERENCES envios(envio_id)       ON DELETE CASCADE
);

CREATE INDEX idx_clientes_envio ON clientes (envio_id);
