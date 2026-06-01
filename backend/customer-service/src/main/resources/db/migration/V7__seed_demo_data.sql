-- ============================================================
-- V7 · Demo seed data: 20 customers, 4 products, 10 envíos
-- Password hash = bcrypt("Password123!", cost=10)
-- ============================================================

-- ----------------------------------------------------------
-- PRODUCTS (4 new)
-- ----------------------------------------------------------
INSERT INTO products (nombre, descripcion, precio) VALUES
  ('Cámara Web HD', 'Cámara web 1080p con micrófono estéreo integrado y corrección de luz automática', 45.99);

INSERT INTO products (nombre, descripcion, precio) VALUES
  ('Hub USB-C 7 Puertos', 'Hub multipuertos USB-C con 2×USB-A, 2×USB-C, HDMI 4K, lector SD y MicroSD', 39.95);

INSERT INTO products (nombre, descripcion, precio) VALUES
  ('Disco SSD Externo 1TB', 'Disco SSD externo USB 3.2 Gen2 con velocidad de lectura 1 050 MB/s', 79.99);

INSERT INTO products (nombre, descripcion, precio) VALUES
  ('Silla Ergonómica Pro', 'Silla de oficina con soporte lumbar ajustable, reposabrazos 4D y base de aluminio', 299.00);

-- ----------------------------------------------------------
-- CUSTOMERS (20)
-- ----------------------------------------------------------
INSERT INTO customers (customer_id, email, first_name, last_name, password_hash, status, ip_address_registered)
VALUES (SYS_GUID(), 'maria.garcia@correo.es',       'María',     'García López',      '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lFzS', 'active', '87.220.10.1');

INSERT INTO customers (customer_id, email, first_name, last_name, password_hash, status, ip_address_registered)
VALUES (SYS_GUID(), 'carlos.martinez@correo.es',    'Carlos',    'Martínez Ruiz',     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lFzS', 'active', '87.220.10.2');

INSERT INTO customers (customer_id, email, first_name, last_name, password_hash, status, ip_address_registered)
VALUES (SYS_GUID(), 'ana.gonzalez@correo.es',       'Ana',       'González Pérez',    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lFzS', 'active', '87.220.10.3');

INSERT INTO customers (customer_id, email, first_name, last_name, password_hash, status, ip_address_registered)
VALUES (SYS_GUID(), 'luis.rodriguez@correo.es',     'Luis',      'Rodríguez Sánchez', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lFzS', 'active', '212.166.4.10');

INSERT INTO customers (customer_id, email, first_name, last_name, password_hash, status, ip_address_registered)
VALUES (SYS_GUID(), 'elena.fernandez@correo.es',    'Elena',     'Fernández Torres',  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lFzS', 'active', '212.166.4.11');

INSERT INTO customers (customer_id, email, first_name, last_name, password_hash, status, ip_address_registered)
VALUES (SYS_GUID(), 'miguel.jimenez@correo.es',     'Miguel',    'Jiménez Castro',    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lFzS', 'active', '83.58.20.5');

INSERT INTO customers (customer_id, email, first_name, last_name, password_hash, status, ip_address_registered)
VALUES (SYS_GUID(), 'sofia.lopez@correo.es',        'Sofía',     'López Moreno',      '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lFzS', 'active', '83.58.20.6');

INSERT INTO customers (customer_id, email, first_name, last_name, password_hash, status, ip_address_registered)
VALUES (SYS_GUID(), 'pablo.diaz@correo.es',         'Pablo',     'Díaz Herrera',      '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lFzS', 'active', '88.3.11.22');

INSERT INTO customers (customer_id, email, first_name, last_name, password_hash, status, ip_address_registered)
VALUES (SYS_GUID(), 'laura.martin@correo.es',       'Laura',     'Martín Vega',       '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lFzS', 'active', '88.3.11.23');

INSERT INTO customers (customer_id, email, first_name, last_name, password_hash, status, ip_address_registered)
VALUES (SYS_GUID(), 'javier.sanchez@correo.es',     'Javier',    'Sánchez Ortega',    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lFzS', 'active', '193.22.8.50');

INSERT INTO customers (customer_id, email, first_name, last_name, password_hash, status, ip_address_registered)
VALUES (SYS_GUID(), 'carmen.alonso@correo.es',      'Carmen',    'Alonso Ramos',      '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lFzS', 'active', '193.22.8.51');

INSERT INTO customers (customer_id, email, first_name, last_name, password_hash, status, ip_address_registered)
VALUES (SYS_GUID(), 'andres.torres@correo.es',      'Andrés',    'Torres Navarro',    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lFzS', 'active', '77.231.14.9');

INSERT INTO customers (customer_id, email, first_name, last_name, password_hash, status, ip_address_registered)
VALUES (SYS_GUID(), 'isabel.ramirez@correo.es',     'Isabel',    'Ramírez Reyes',     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lFzS', 'active', '77.231.14.10');

INSERT INTO customers (customer_id, email, first_name, last_name, password_hash, status, ip_address_registered)
VALUES (SYS_GUID(), 'francisco.ruiz@correo.es',     'Francisco', 'Ruiz Morales',      '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lFzS', 'active', '46.6.25.100');

INSERT INTO customers (customer_id, email, first_name, last_name, password_hash, status, ip_address_registered)
VALUES (SYS_GUID(), 'marta.moreno@correo.es',       'Marta',     'Moreno Cruz',       '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lFzS', 'active', '46.6.25.101');

INSERT INTO customers (customer_id, email, first_name, last_name, password_hash, status, ip_address_registered)
VALUES (SYS_GUID(), 'roberto.flores@correo.es',     'Roberto',   'Flores Vargas',     '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lFzS', 'active', '213.97.31.4');

INSERT INTO customers (customer_id, email, first_name, last_name, password_hash, status, ip_address_registered)
VALUES (SYS_GUID(), 'patricia.gomez@correo.es',     'Patricia',  'Gómez Iglesias',    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lFzS', 'active', '213.97.31.5');

INSERT INTO customers (customer_id, email, first_name, last_name, password_hash, status, ip_address_registered)
VALUES (SYS_GUID(), 'alberto.munoz@correo.es',      'Alberto',   'Muñoz Medina',      '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lFzS', 'active', '90.169.44.8');

INSERT INTO customers (customer_id, email, first_name, last_name, password_hash, status, ip_address_registered)
VALUES (SYS_GUID(), 'cristina.blanco@correo.es',    'Cristina',  'Blanco Serrano',    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lFzS', 'active', '90.169.44.9');

INSERT INTO customers (customer_id, email, first_name, last_name, password_hash, status, ip_address_registered)
VALUES (SYS_GUID(), 'alejandro.gutierrez@correo.es','Alejandro', 'Gutiérrez Molina',  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lFzS', 'active', '62.57.93.3');

-- ----------------------------------------------------------
-- ENVÍOS (10) · Origen: Guadalajara · Transit 48h
-- Uses subqueries to resolve customer_id / product_id safely
-- ----------------------------------------------------------
INSERT INTO envios (customer_id, product_id, fecha_envio, estado, direccion_envio, codigo_postal, pais)
SELECT
  (SELECT customer_id FROM customers WHERE email = 'maria.garcia@correo.es'),
  (SELECT product_id  FROM products  WHERE nombre = 'Laptop Pro 15'          AND ROWNUM = 1),
  TIMESTAMP '2026-05-28 09:00:00', 'entregado', 'Calle Gran Vía 45, 3ºA', '28013', 'España'
FROM DUAL;

INSERT INTO envios (customer_id, product_id, fecha_envio, estado, direccion_envio, codigo_postal, pais)
SELECT
  (SELECT customer_id FROM customers WHERE email = 'carlos.martinez@correo.es'),
  (SELECT product_id  FROM products  WHERE nombre = 'Ratón Inalámbrico'       AND ROWNUM = 1),
  TIMESTAMP '2026-05-29 11:30:00', 'entregado', 'Avenida de la Constitución 12, 1ºB', '41001', 'España'
FROM DUAL;

INSERT INTO envios (customer_id, product_id, fecha_envio, estado, direccion_envio, codigo_postal, pais)
SELECT
  (SELECT customer_id FROM customers WHERE email = 'ana.gonzalez@correo.es'),
  (SELECT product_id  FROM products  WHERE nombre = 'Teclado Mecánico'        AND ROWNUM = 1),
  TIMESTAMP '2026-05-30 08:15:00', 'enviado', 'Paseo de Gracia 88, 4ºC', '08008', 'España'
FROM DUAL;

INSERT INTO envios (customer_id, product_id, fecha_envio, estado, direccion_envio, codigo_postal, pais)
SELECT
  (SELECT customer_id FROM customers WHERE email = 'luis.rodriguez@correo.es'),
  (SELECT product_id  FROM products  WHERE nombre = 'Monitor 27"'             AND ROWNUM = 1),
  TIMESTAMP '2026-05-30 14:00:00', 'enviado', 'Calle Serrano 101, 2ºD', '28006', 'España'
FROM DUAL;

INSERT INTO envios (customer_id, product_id, fecha_envio, estado, direccion_envio, codigo_postal, pais)
SELECT
  (SELECT customer_id FROM customers WHERE email = 'elena.fernandez@correo.es'),
  (SELECT product_id  FROM products  WHERE nombre = 'Auriculares USB'         AND ROWNUM = 1),
  TIMESTAMP '2026-05-31 10:00:00', 'pendiente', 'Calle Colón 7, Entlo. A', '46004', 'España'
FROM DUAL;

INSERT INTO envios (customer_id, product_id, fecha_envio, estado, direccion_envio, codigo_postal, pais)
SELECT
  (SELECT customer_id FROM customers WHERE email = 'miguel.jimenez@correo.es'),
  (SELECT product_id  FROM products  WHERE nombre = 'Cámara Web HD'           AND ROWNUM = 1),
  TIMESTAMP '2026-05-31 12:30:00', 'pendiente', 'Plaza Mayor 3, 1ºA', '47001', 'España'
FROM DUAL;

INSERT INTO envios (customer_id, product_id, fecha_envio, estado, direccion_envio, codigo_postal, pais)
SELECT
  (SELECT customer_id FROM customers WHERE email = 'sofia.lopez@correo.es'),
  (SELECT product_id  FROM products  WHERE nombre = 'Hub USB-C 7 Puertos'     AND ROWNUM = 1),
  TIMESTAMP '2026-06-01 09:45:00', 'pendiente', 'Calle Real 22, Bajo B', '15001', 'España'
FROM DUAL;

INSERT INTO envios (customer_id, product_id, fecha_envio, estado, direccion_envio, codigo_postal, pais)
SELECT
  (SELECT customer_id FROM customers WHERE email = 'pablo.diaz@correo.es'),
  (SELECT product_id  FROM products  WHERE nombre = 'Disco SSD Externo 1TB'   AND ROWNUM = 1),
  TIMESTAMP '2026-06-01 10:00:00', 'pendiente', 'Calle Marqués de Larios 5, 3ºC', '29005', 'España'
FROM DUAL;

INSERT INTO envios (customer_id, product_id, fecha_envio, estado, direccion_envio, codigo_postal, pais)
SELECT
  (SELECT customer_id FROM customers WHERE email = 'laura.martin@correo.es'),
  (SELECT product_id  FROM products  WHERE nombre = 'Silla Ergonómica Pro'    AND ROWNUM = 1),
  TIMESTAMP '2026-06-01 11:00:00', 'pendiente', 'Avenida de la Libertad 30, 5ºA', '20004', 'España'
FROM DUAL;

INSERT INTO envios (customer_id, product_id, fecha_envio, estado, direccion_envio, codigo_postal, pais)
SELECT
  (SELECT customer_id FROM customers WHERE email = 'javier.sanchez@correo.es'),
  (SELECT product_id  FROM products  WHERE nombre = 'Laptop Pro 15'           AND ROWNUM = 1),
  TIMESTAMP '2026-06-01 13:00:00', 'pendiente', 'Calle Ancha 18, 2ºB', '14001', 'España'
FROM DUAL;
