CREATE TABLE customers (
    customer_id           RAW(16)        DEFAULT SYS_GUID()          NOT NULL,
    email                 VARCHAR2(255)                               NOT NULL,
    first_name            VARCHAR2(100)                               NOT NULL,
    last_name             VARCHAR2(100)                               NOT NULL,
    password_hash         VARCHAR2(255)                               NOT NULL,
    status                VARCHAR2(20)   DEFAULT 'active'             NOT NULL,
    registration_date     TIMESTAMP      DEFAULT CURRENT_TIMESTAMP    NOT NULL,
    ip_address_registered VARCHAR2(64)                                NOT NULL,
    deleted_at            TIMESTAMP                                       NULL,
    created_at            TIMESTAMP      DEFAULT CURRENT_TIMESTAMP    NOT NULL,
    updated_at            TIMESTAMP      DEFAULT CURRENT_TIMESTAMP    NOT NULL,
    CONSTRAINT pk_customers PRIMARY KEY (customer_id),
    CONSTRAINT chk_customers_status CHECK (status IN ('active', 'deleted'))
);

CREATE TABLE audit_logs (
    audit_id       NUMBER(19,0) GENERATED ALWAYS AS IDENTITY NOT NULL,
    log_timestamp  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP    NOT NULL,
    action         VARCHAR2(50)                              NOT NULL,
    email_hash     VARCHAR2(64)                              NOT NULL,
    ip_address     VARCHAR2(64)                              NOT NULL,
    status         VARCHAR2(20)                              NOT NULL,
    failure_reason VARCHAR2(100)                                 NULL,
    customer_id    RAW(16)                                       NULL,
    details        CLOB                                          NULL,
    CONSTRAINT pk_audit_logs PRIMARY KEY (audit_id),
    CONSTRAINT fk_audit_logs_customer FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id) ON DELETE SET NULL
);

-- Oracle does not support partial (filtered) indexes; uniqueness of active emails
-- is enforced at the application layer via existsByEmailIgnoreCaseAndStatus.
CREATE INDEX idx_customers_email_lower
    ON customers (LOWER(email));

CREATE INDEX idx_customers_ip_registration
    ON customers (ip_address_registered, registration_date DESC);

-- Oracle equivalent of PostgreSQL split_part(email, '@', 2)
CREATE INDEX idx_customers_email_domain
    ON customers (SUBSTR(LOWER(email), INSTR(LOWER(email), '@') + 1), registration_date DESC);

CREATE INDEX idx_customers_status
    ON customers (status);

CREATE INDEX idx_audit_logs_timestamp
    ON audit_logs (log_timestamp DESC);

CREATE INDEX idx_audit_logs_email_hash
    ON audit_logs (email_hash);

CREATE INDEX idx_audit_logs_ip
    ON audit_logs (ip_address);

CREATE INDEX idx_audit_logs_status
    ON audit_logs (status);

CREATE INDEX idx_audit_logs_failure_reason
    ON audit_logs (failure_reason);

CREATE INDEX idx_audit_logs_customer_id
    ON audit_logs (customer_id);
