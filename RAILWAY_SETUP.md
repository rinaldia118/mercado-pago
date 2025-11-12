# 🚂 Configuración de Railway para Backend

## ✅ Puedes tener todo en un solo repositorio

No necesitas un repositorio separado. Railway puede deployar solo el backend desde tu repositorio completo.

## 📝 Pasos para Configurar Railway

### 1. Conectar el Repositorio

1. Ve a https://railway.app
2. Crea cuenta (con GitHub)
3. "New Project" → "Deploy from GitHub repo"
4. Selecciona tu repositorio `mercado-pago`

### 2. Configurar el Servicio Backend

Railway detectará automáticamente que es un proyecto Node.js, pero necesitas configurar:

#### En la configuración del servicio:

1. **Root Directory:** `backend`
   - Esto le dice a Railway que el código está en la carpeta `backend/`

2. **Build Command:** `npm install && npm run build`
   - O simplemente: `npm run build` (si ya instaló dependencias)

3. **Start Command:** `npm start`
   - Esto ejecutará `node dist/index.js`

### 3. Agregar PostgreSQL

1. En tu proyecto de Railway, haz clic en "New"
2. Selecciona "Database" → "Add PostgreSQL"
3. Railway creará automáticamente una base de datos PostgreSQL

### 4. Configurar Variables de Entorno

En la configuración del servicio backend, agrega estas variables:

```env
NODE_ENV=production
PORT=3001

# Base de datos (Railway te da estas variables automáticamente)
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_USERNAME=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}
DB_NAME=${{Postgres.PGDATABASE}}

# URLs (las actualizarás después de deployar frontend)
FRONTEND_URL=https://tu-frontend.vercel.app
BACKEND_URL=${{RAILWAY_PUBLIC_DOMAIN}}

# Mercado Pago
MERCADOPAGO_ACCESS_TOKEN=tu-token-de-produccion
MERCADOPAGO_TEST_MODE=false
```

**Nota:** `${{Postgres.PGHOST}}` es la sintaxis de Railway para referenciar variables del servicio PostgreSQL.

### 5. Obtener la URL Pública

1. Railway te dará automáticamente una URL pública
2. Puedes verla en la pestaña "Settings" → "Networking"
3. O en la pestaña "Deployments" → "View Logs"

La URL será algo como: `https://tu-backend-production.up.railway.app`

## 🔧 Configuración Avanzada (Opcional)

### Usar railway.json para configuración

Puedes crear un archivo `railway.json` en la raíz del repositorio:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "cd backend && npm install && npm run build"
  },
  "deploy": {
    "startCommand": "cd backend && npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

O más simple, en la configuración de Railway:

- **Root Directory:** `backend`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`

## 📋 Checklist

- [ ] Repositorio conectado a Railway
- [ ] Root Directory configurado como `backend`
- [ ] Build Command configurado
- [ ] Start Command configurado
- [ ] PostgreSQL agregado como servicio
- [ ] Variables de entorno configuradas
- [ ] URL pública obtenida
- [ ] Backend deployado correctamente
- [ ] Health check funciona: `curl https://tu-backend.railway.app/health`

## 🐛 Troubleshooting

### Error: "Cannot find module"

**Problema:** Railway no está instalando dependencias correctamente.

**Solución:** Asegúrate de que el Build Command incluya `npm install`:
```
npm install && npm run build
```

### Error: "Cannot find package.json"

**Problema:** Root Directory no está configurado correctamente.

**Solución:** Verifica que Root Directory sea `backend` (no `backend/`)

### Error de conexión a base de datos

**Problema:** Variables de entorno de PostgreSQL no están configuradas.

**Solución:** Usa la sintaxis `${{Postgres.PGHOST}}` para referenciar el servicio PostgreSQL.

## 🔗 Próximos Pasos

Después de deployar el backend:

1. Obtén la URL pública de Railway
2. Deploya el frontend en Vercel
3. Actualiza `FRONTEND_URL` en Railway con la URL de Vercel
4. Actualiza `REACT_APP_API_URL` en Vercel con la URL de Railway
5. Configura webhooks en Mercado Pago con la URL de Railway

