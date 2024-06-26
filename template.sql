-- DDL
-- Crear tabla 'department'
CREATE TABLE department
(
    id              SERIAL4 PRIMARY KEY,
    department_name VARCHAR(255),
    deleted         INTEGER   DEFAULT 0 CHECK (deleted IN (0, 1)),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Crear tabla 'picture'
CREATE TABLE picture
(
    id         SERIAL4 PRIMARY KEY,
    img        BYTEA,
    img_name   VARCHAR(255),
    img_type   VARCHAR(50),
    deleted    INTEGER   DEFAULT 0 CHECK (deleted IN (0, 1)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Crear tabla 'dentist'
CREATE TABLE dentist
(
    id            SERIAL4 PRIMARY KEY,
    address       VARCHAR(255),
    date_of_birth DATE,
    email         VARCHAR(255),
    full_name     VARCHAR(255),
    gender        VARCHAR(50),
    job           VARCHAR(255),
    nif           VARCHAR(50),
    pass          TEXT,
    permits       INTEGER   DEFAULT 0 CHECK (deleted IN (0, 1)),
    department    INTEGER REFERENCES department (id) ON DELETE SET NULL,
    picture       INTEGER REFERENCES picture (id) ON DELETE SET NULL,
    deleted       INTEGER   DEFAULT 0 CHECK (deleted IN (0, 1)),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Crear tabla 'patient'
CREATE TABLE patient
(
    id            SERIAL4 PRIMARY KEY,
    address       VARCHAR(255),
    date_of_birth DATE,
    email         VARCHAR(255),
    full_name     VARCHAR(255),
    gender        VARCHAR(50),
    nif           VARCHAR(50),
    phone         INTEGER,
    deleted       INTEGER   DEFAULT 0 CHECK (deleted IN (0, 1)),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dentist       INTEGER REFERENCES dentist (id) ON DELETE SET NULL
);
-- Crear tabla 'payment'
CREATE TABLE payment
(
    id              SERIAL4 PRIMARY KEY,
    bank_extract    INTEGER,
    comment         TEXT,
    payment_date    TIMESTAMP,
    payment_receipt VARCHAR(255),
    price           NUMERIC(38, 2),
    provider        VARCHAR(255),
    service         VARCHAR(255),
    state           VARCHAR(50),
    deleted         INTEGER   DEFAULT 0 CHECK (deleted IN (0, 1)),
    dentist         INTEGER REFERENCES dentist (id) ON DELETE SET NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Crear tabla 'appointment'
CREATE TABLE appointment
(
    id                  SERIAL4 PRIMARY KEY,
    date_time_beginning TIMESTAMP,
    date_time_ending    TIMESTAMP,
    description         TEXT,
    invoice             VARCHAR(255),
    priority            VARCHAR(50),
    state               VARCHAR(50),
    title               VARCHAR(255),
    total_price         NUMERIC(38, 2),
    patient             INTEGER REFERENCES patient (id) ON DELETE SET NULL,
    payment             INTEGER REFERENCES payment (id) ON DELETE SET NULL,
    department          INTEGER REFERENCES department (id) ON DELETE SET NULL,
    deleted             INTEGER   DEFAULT 0 CHECK (deleted IN (0, 1)),
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dentist             INTEGER REFERENCES dentist (id) ON DELETE SET NULL

);
-- Crear tabla 'event'
CREATE TABLE event
(
    id                  SERIAL4 PRIMARY KEY,
    date_time_beginning TIMESTAMP,
    date_time_ending    TIMESTAMP,
    description         TEXT,
    location            VARCHAR(255),
    title               VARCHAR(255),
    dentist             INTEGER REFERENCES dentist (id) ON DELETE SET NULL,
    deleted             INTEGER   DEFAULT 0 CHECK (deleted IN (0, 1)),
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Crear tabla 'intervention'
CREATE TABLE intervention
(
    id         SERIAL4 PRIMARY KEY,
    full_name  VARCHAR(255),
    price      NUMERIC(38, 2),
    department INTEGER REFERENCES department (id) ON DELETE SET NULL,
    deleted    INTEGER   DEFAULT 0 CHECK (deleted IN (0, 1)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Crear tabla intermedia appointments_interventions (relacion many2many)
CREATE TABLE appointments_interventions
(
    appointment  INTEGER REFERENCES appointment (id) ON DELETE SET NULL,
    intervention INTEGER REFERENCES intervention (id) ON DELETE SET NULL
);

-- DML --
-- Insertar datos de prueba en la tabla 'patient'
INSERT INTO patient (address, date_of_birth, email, full_name, gender, nif, phone, dentist)
SELECT 'Dirección ' || generate_series,
       CURRENT_DATE - INTERVAL '20 years' * random(),
       'paciente' || generate_series || '@example.com',
       'Paciente ' || generate_series,
       CASE WHEN random() < 0.5 THEN 'Male' ELSE 'Female' END,
       'NIF' || generate_series,
       600000000 + generate_series,
       generate_series
FROM generate_series(1, 50);

-- Insertar datos de prueba en la tabla 'department'
INSERT INTO department (department_name)
SELECT 'Departamento ' || generate_series
FROM generate_series(1, 50);

-- Insertar datos de prueba en la tabla 'picture'
INSERT INTO picture (img, img_name, img_type)
SELECT NULL,
       'imagen' || generate_series || '.jpg',
       'image/jpeg'
FROM generate_series(1, 50);


-- Insertar datos de prueba en la tabla 'dentist'
INSERT INTO dentist (address, date_of_birth, email, full_name, gender, job, nif, pass, department, picture)
SELECT 'Dirección ' || generate_series,
       CURRENT_DATE - INTERVAL '30 years' * random(),
       'dentista' || generate_series || '@example.com',
       'Dentista ' || generate_series,
       CASE WHEN random() < 0.5 THEN 'Male' ELSE 'Female' END,
       'Job ' || generate_series,
       'NIF' || generate_series,
       'password' || generate_series,
       generate_series,
       generate_series
FROM generate_series(1, 50);

-- Insertar datos de prueba en la tabla 'payment'
INSERT INTO payment (bank_extract, comment, payment_date, payment_receipt, price, provider, service, state, dentist)
SELECT 100000000 + generate_series,
       'Comentario ' || generate_series,
       CURRENT_TIMESTAMP - INTERVAL '30 days' * random(),
       'Recibo de pago ' || generate_series,
       random() * 1000,
       'Proveedor ' || generate_series,
       'Servicio ' || generate_series,
       CASE WHEN random() < 0.5 THEN 'Paid' ELSE 'Pending' END,
       generate_series
FROM generate_series(1, 50);

-- Insertar datos de prueba en la tabla 'appointment'
INSERT INTO appointment (date_time_beginning, date_time_ending, description, invoice, priority, state, title,
                         total_price, patient, payment, department, dentist)
SELECT CURRENT_TIMESTAMP + INTERVAL '1 day' * random(),
       CURRENT_TIMESTAMP + INTERVAL '2 days' * random(),
       'Descripción ' || generate_series,
       'Factura ' || generate_series,
       CASE WHEN random() < 0.5 THEN 'High' ELSE 'Low' END,
       CASE WHEN random() < 0.5 THEN 'Confirmed' ELSE 'Pending' END,
       'Título ' || generate_series,
       random() * 500,
       generate_series,
       generate_series,
       generate_series,
       generate_series
FROM generate_series(1, 50);

-- Insertar datos de prueba en la tabla 'event'
INSERT INTO event (date_time_beginning, date_time_ending, description, location, title, dentist)
SELECT CURRENT_TIMESTAMP + INTERVAL '1 day' * random(),
       CURRENT_TIMESTAMP + INTERVAL '2 days' * random(),
       'Descripción ' || generate_series,
       'Ubicación ' || generate_series,
       'Evento ' || generate_series,
       generate_series
FROM generate_series(1, 50);

-- Insertar datos de prueba en la tabla 'intervention'
INSERT INTO intervention (full_name, price, department)
SELECT 'Intervención ' || generate_series,
       random() * 1000,
       generate_series
FROM generate_series(1, 50);

-- Insertar datos de prueba en la tabla 'appointments_interventions'
INSERT INTO appointments_interventions (appointment, intervention)
SELECT generate_series, generate_series
FROM generate_series(1, 50);



