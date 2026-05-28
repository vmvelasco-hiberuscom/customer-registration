-- Virtual column: LOWER(email) when status='active', NULL when status='deleted'.
-- Oracle unique indexes ignore NULLs, so previously deleted emails can be re-registered
-- while active emails remain globally unique.
ALTER TABLE customers ADD (
    active_email VARCHAR2(255) GENERATED ALWAYS AS
        (CASE WHEN status = 'active' THEN LOWER(email) END) VIRTUAL
);

CREATE UNIQUE INDEX uq_customers_active_email ON customers (active_email);
