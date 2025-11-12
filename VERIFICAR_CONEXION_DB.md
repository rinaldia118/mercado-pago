# 🔍 Cómo Verificar la Conexión a la Base de Datos

Hay varias formas de verificar que el backend se conectó correctamente a la base de datos en Railway:

---

## ✅ Método 1: Endpoint de Health Check (Más Fácil)

### Desde el Navegador o curl:

```bash
# Health check básico (solo verifica que el servidor está corriendo)
curl https://tu-backend.railway.app/health

# Health check completo (verifica conexión a DB)
curl https://tu-backend.railway.app/health/db
```

### Respuesta esperada si TODO está bien:

```json
{
  "status": "ok",
  "database": "connected",
  "tableExists": true,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Respuesta si hay problemas:

```json
{
  "status": "error",
  "database": "disconnected",
  "message": "Error message aquí",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## ✅ Método 2: Revisar los Logs en Railway

1. Ve a tu proyecto en Railway
2. Selecciona el servicio backend
3. Ve a la pestaña **"Deployments"**
4. Haz clic en el último deployment
5. Haz clic en **"View Logs"**

### Logs esperados si la conexión fue exitosa:

```
Database connected successfully
Running pending migrations...
✅ 1 migration(s) executed successfully
   - CreatePaymentsTable1700000000000
Server running on port 3001
```

### Si hay errores de conexión, verás:

```
Error connecting to database: [detalles del error]
```

**Errores comunes:**
- `Connection refused` → Variables de entorno incorrectas o DB no disponible
- `password authentication failed` → Credenciales incorrectas
- `database does not exist` → Nombre de base de datos incorrecto
- `timeout` → DB_HOST o DB_PORT incorrectos

---

## ✅ Método 3: Verificar Variables de Entorno en Railway

1. Ve a tu proyecto en Railway
2. Selecciona el servicio backend
3. Ve a la pestaña **"Variables"**

### Verifica que estas variables estén configuradas:

```
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_USERNAME=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}
DB_NAME=${{Postgres.PGDATABASE}}
```

**⚠️ IMPORTANTE:** 
- Si usas `${{Postgres.PGHOST}}`, Railway debe tener un servicio PostgreSQL conectado
- Si las variables no tienen el formato `${{...}}`, verifica que los valores sean correctos

---

## ✅ Método 4: Conectarse Directamente a la DB con Railway CLI

### Instalar Railway CLI:

```bash
npm i -g @railway/cli
```

### Conectarse a la base de datos:

```bash
# Conectarse al proyecto
railway login
railway link

# Conectarse a PostgreSQL
railway run psql $DATABASE_URL
```

### Una vez conectado, verifica la tabla:

```sql
-- Ver todas las tablas
\dt

-- Ver la estructura de la tabla payments
\d payments

-- Ver datos en la tabla (si hay)
SELECT * FROM payments;

-- Salir
\q
```

---

## ✅ Método 5: Probar Creando un Pago de Prueba

Si la conexión funciona, puedes probar creando un pago:

```bash
curl -X POST https://tu-backend.railway.app/api/payments/create-preference \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100,
    "description": "Prueba de conexión"
  }'
```

Si funciona, el pago se guardará en la base de datos y verás en los logs:

```
✅ Pago guardado en base de datos
```

---

## 🔧 Solución de Problemas Comunes

### Problema: "Database not initialized"

**Causa:** El servidor se inició antes de que la DB estuviera lista.

**Solución:** 
- Verifica que el servicio PostgreSQL esté corriendo en Railway
- Revisa que las variables de entorno estén correctas
- Haz un redeploy del backend

### Problema: "tableExists: false"

**Causa:** La tabla `payments` no se creó.

**Solución:**
1. Verifica que `NODE_ENV=production` esté configurado
2. Revisa los logs para ver si las migraciones se ejecutaron
3. Si no, ejecuta las migraciones manualmente (ver `CREAR_TABLA_RAILWAY.md`)

### Problema: "Connection refused" o "timeout"

**Causa:** Variables de entorno incorrectas o DB no accesible.

**Solución:**
1. Verifica que el servicio PostgreSQL esté corriendo
2. Verifica que `DB_HOST`, `DB_PORT` sean correctos
3. Si usas `${{Postgres.PGHOST}}`, asegúrate de que el servicio PostgreSQL esté en el mismo proyecto

### Problema: "password authentication failed"

**Causa:** Credenciales incorrectas.

**Solución:**
1. Verifica `DB_USERNAME` y `DB_PASSWORD`
2. Si usas `${{Postgres.PGUSER}}`, Railway debería generar estas automáticamente
3. Si las cambiaste manualmente, asegúrate de que coincidan con las de PostgreSQL

---

## 📊 Checklist de Verificación

- [ ] El endpoint `/health/db` devuelve `"database": "connected"`
- [ ] Los logs muestran `"Database connected successfully"`
- [ ] Los logs muestran que las migraciones se ejecutaron
- [ ] La tabla `payments` existe (`"tableExists": true`)
- [ ] Puedo crear un pago de prueba y se guarda en la DB
- [ ] Las variables de entorno están correctamente configuradas

---

## 🎯 Prueba Rápida

Ejecuta esto en tu terminal para una verificación completa:

```bash
# Reemplaza con tu URL de Railway
BACKEND_URL="https://tu-backend.railway.app"

echo "1. Verificando health check básico..."
curl -s $BACKEND_URL/health | jq

echo "\n2. Verificando conexión a DB..."
curl -s $BACKEND_URL/health/db | jq

echo "\n3. Probando crear un pago..."
curl -X POST $BACKEND_URL/api/payments/create-preference \
  -H "Content-Type: application/json" \
  -d '{"amount": 100, "description": "Prueba"}' | jq
```

Si todos los comandos funcionan, ¡tu conexión a la DB está perfecta! ✅

