# Cómo crear la tabla en Railway

El proyecto usa la tabla `payments` para almacenar los pagos. Tienes 3 opciones para crearla en Railway:

## Opción 1: Migración automática (Recomendado) ✅

**¡Buenas noticias!** El código ya está configurado para ejecutar migraciones automáticamente cuando `NODE_ENV=production`.

### Paso 1: Variables de entorno en Railway
Asegúrate de tener estas variables configuradas en Railway:
- `DB_HOST` (Railway lo proporciona automáticamente si usas su PostgreSQL)
- `DB_PORT`
- `DB_USERNAME`
- `DB_PASSWORD`
- `DB_NAME`
- `NODE_ENV=production` ⚠️ **IMPORTANTE**: Esto activa las migraciones automáticas

### Paso 2: Desplegar
1. Haz commit y push de los cambios:
   ```bash
   git add .
   git commit -m "Add migrations for payments table"
   git push
   ```

2. Railway ejecutará las migraciones automáticamente al iniciar el servidor.

3. Revisa los logs en Railway para ver:
   ```
   Database connected successfully
   Running pending migrations...
   ✅ 1 migration(s) executed successfully
      - CreatePaymentsTable1700000000000
   Server running on port 3001
   ```

---

## Opción 2: Ejecutar migración manualmente desde Railway CLI

Si prefieres ejecutar la migración manualmente antes del deploy:

### Paso 1: Instalar Railway CLI
```bash
npm i -g @railway/cli
```

### Paso 2: Conectarte a tu proyecto
```bash
railway login
railway link
```

### Paso 3: Ejecutar la migración
```bash
cd backend
railway run npm run migration:run
```

**Nota:** Si usas Railway CLI, asegúrate de que las variables de entorno estén configuradas en Railway antes de ejecutar.

---

## Opción 3: Ejecutar SQL manualmente (Más rápido)

### Paso 1: Conectarte a la base de datos en Railway
1. Ve a tu proyecto en Railway
2. Abre el servicio de PostgreSQL
3. Haz clic en "Query" o "Connect" para abrir el editor SQL

### Paso 2: Ejecutar el SQL
Copia y pega el contenido del archivo `backend/src/migrations/create-payments-table.sql`:

```sql
-- Asegúrate de que la extensión uuid esté habilitada
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
```

### Paso 3: Ejecutar
Haz clic en "Run" o presiona Ctrl+Enter.

---

## Verificar que la tabla se creó

Puedes verificar ejecutando esta consulta en Railway:

```sql
SELECT * FROM payments;
```

O desde la terminal con Railway CLI:

```bash
railway run psql $DATABASE_URL -c "\dt payments"
```

---

## Nota importante

- La **Opción 3** es la más rápida si solo necesitas crear la tabla una vez
- La **Opción 1** es mejor para producción porque se ejecuta automáticamente en cada deploy
- La **Opción 2** es útil para ejecutar migraciones manualmente cuando sea necesario

