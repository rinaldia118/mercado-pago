-- Script SQL para crear la tabla payments manualmente
-- Ejecuta este script en tu base de datos de Railway si prefieres no usar migraciones

-- Asegúrate de que la extensión uuid esté habilitada (PostgreSQL)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Crear la tabla payments
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "preferenceId" VARCHAR NOT NULL,
    status VARCHAR NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR NOT NULL,
    "paymentId" VARCHAR,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Crear índices útiles
CREATE INDEX IF NOT EXISTS idx_payments_preference_id ON payments("preferenceId");
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments("createdAt");

