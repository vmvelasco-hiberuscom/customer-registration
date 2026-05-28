CREATE TABLE products (
    product_id    NUMBER(19,0) GENERATED ALWAYS AS IDENTITY NOT NULL,
    nombre        VARCHAR2(200)                              NOT NULL,
    descripcion   VARCHAR2(1000)                             NOT NULL,
    precio        NUMBER(12,2)                               NOT NULL,
    created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP     NOT NULL,
    updated_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP     NOT NULL,
    CONSTRAINT pk_products PRIMARY KEY (product_id),
    CONSTRAINT chk_products_precio CHECK (precio >= 0)
);

CREATE INDEX idx_products_nombre ON products (LOWER(nombre));

INSERT INTO products (nombre, descripcion, precio) VALUES ('Laptop Pro 15', 'Laptop de alto rendimiento con procesador Intel i7', 1299.99);
INSERT INTO products (nombre, descripcion, precio) VALUES ('Ratón Inalámbrico', 'Ratón ergonómico con conectividad Bluetooth', 29.95);
INSERT INTO products (nombre, descripcion, precio) VALUES ('Teclado Mecánico', 'Teclado mecánico retroiluminado con switches Cherry MX', 89.90);
INSERT INTO products (nombre, descripcion, precio) VALUES ('Monitor 27"', 'Monitor Full HD con panel IPS y 75 Hz de refresco', 249.00);
INSERT INTO products (nombre, descripcion, precio) VALUES ('Auriculares USB', 'Auriculares con cancelación de ruido y micrófono integrado', 59.50);
