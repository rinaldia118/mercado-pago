# 🚂 Configuración de Railway SIN Docker - Paso a Paso

## ✅ Tu proyecto está listo

Tu `package.json` ya tiene los scripts necesarios:
- ✅ `build`: Compila TypeScript
- ✅ `start`: Ejecuta el servidor

## ⚠️ IMPORTANTE: Desactivar Docker

Railway detecta automáticamente el Dockerfile. Para usar Railway sin Docker:

**Opción 1 (Recomendada):** Ya creamos un archivo `railway.json` en la carpeta `backend/` que fuerza el uso de Nixpacks.

**Nota:** Como configuraste Root Directory como `backend`, Railway busca el `railway.json` en ese directorio.

**Opción 2:** Si Railway sigue usando Docker, renombra el Dockerfile:
```bash
mv backend/Dockerfile backend/Dockerfile.backup
```

**Opción 3:** En Railway, ve a Settings → Build → y selecciona "Nixpacks" en lugar de "Dockerfile".

## 📝 Pasos para Deploy en Railway

### Paso 1: Preparar el Repositorio

Asegúrate de que tu código esté en GitHub:

```bash
# Si aún no tienes git inicializado
git init
git add .
git commit -m "Initial commit"
git remote add origin tu-repositorio-github
git push -u origin main
```

### Paso 2: Crear Proyecto en Railway

1. Ve a https://railway.app
2. Haz clic en "Start a New Project"
3. Selecciona "Deploy from GitHub repo"
4. Autoriza Railway a acceder a tu cuenta de GitHub
5. Selecciona tu repositorio `mercado-pago`

### Paso 3: Configurar el Servicio Backend

Railway detectará automáticamente que es Node.js, pero necesitas configurar:

1. **Haz clic en el servicio** que Railway creó
2. Ve a la pestaña **"Settings"**
3. Busca **"Root Directory"** y pon: `backend`
4. Ve a la pestaña **"Variables"** para configurar variables de entorno

### Paso 4: Agregar PostgreSQL

1. En tu proyecto de Railway, haz clic en **"New"** (botón verde)
2. Selecciona **"Database"**
3. Selecciona **"Add PostgreSQL"**
4. Railway creará automáticamente una base de datos PostgreSQL

### Paso 5: Configurar Variables de Entorno

En la pestaña **"Variables"** del servicio backend, agrega estas variables:

#### Variables Básicas
```env
NODE_ENV=production
PORT=3001
```

#### Variables de Base de Datos (Railway las genera automáticamente)
```env
DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_USERNAME=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}
DB_NAME=${{Postgres.PGDATABASE}}
```

**Cómo agregarlas:**
1. Haz clic en **"New Variable"**
2. Nombre: `DB_HOST`
3. Valor: `${{Postgres.PGHOST}}`
4. Repite para las demás variables de PostgreSQL

#### Variables de URLs (Actualizarás después)
```env
FRONTEND_URL=https://tu-frontend.vercel.app
BACKEND_URL=${{RAILWAY_PUBLIC_DOMAIN}}
```

**Nota:** `${{RAILWAY_PUBLIC_DOMAIN}}` es una variable especial de Railway que contiene la URL pública de tu servicio.

#### Variables de Mercado Pago
```env
MERCADOPAGO_ACCESS_TOKEN=tu-token-de-produccion-aqui
MERCADOPAGO_TEST_MODE=false
```

### Paso 6: Configurar Build y Start (Opcional)

Railway debería detectar automáticamente, pero puedes verificar en **Settings**:

- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`

Si Railway no lo detecta automáticamente, configúralo manualmente.

### Paso 7: Obtener URL Pública

1. Ve a la pestaña **"Settings"** del servicio
2. Busca **"Networking"**
3. Haz clic en **"Generate Domain"** si no hay uno
4. Railway te dará una URL como: `https://tu-backend-production.up.railway.app`

### Paso 8: Verificar el Deploy

1. Ve a la pestaña **"Deployments"**
2. Verás el progreso del build
3. Cuando termine, haz clic en **"View Logs"** para ver los logs
4. Deberías ver: `Server running on port 3001`

### Paso 9: Probar el Health Check

Abre en tu navegador o usa curl:
```bash
curl https://tu-backend-production.up.railway.app/health
```

Deberías recibir: `{"status":"ok"}`

## 🔧 Configuración Avanzada (Opcional)

### Crear railway.json (Opcional)

Puedes crear un archivo `railway.json` en la raíz del repositorio para configuración personalizada:

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

**Nota:** Si configuraste Root Directory como `backend`, no necesitas el `cd backend` en los comandos.

## 📋 Checklist de Configuración

- [ ] Repositorio en GitHub
- [ ] Proyecto creado en Railway
- [ ] Servicio backend configurado
- [ ] Root Directory: `backend`
- [ ] PostgreSQL agregado
- [ ] Variables de entorno configuradas:
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=3001`
  - [ ] Variables de PostgreSQL (`${{Postgres.*}}`)
  - [ ] `FRONTEND_URL` (actualizar después de deployar frontend)
  - [ ] `BACKEND_URL=${{RAILWAY_PUBLIC_DOMAIN}}`
  - [ ] `MERCADOPAGO_ACCESS_TOKEN`
  - [ ] `MERCADOPAGO_TEST_MODE=false`
- [ ] URL pública generada
- [ ] Deploy exitoso
- [ ] Health check funciona

## 🐛 Troubleshooting

### Error: "Cannot find module"

**Problema:** Las dependencias no se instalaron correctamente.

**Solución:** Verifica que el Build Command incluya `npm install`:
```
npm install && npm run build
```

### Error: "Cannot find package.json"

**Problema:** Root Directory no está configurado correctamente.

**Solución:** 
1. Ve a Settings → Root Directory
2. Asegúrate de que sea exactamente `backend` (sin barra final)

### Error de conexión a base de datos

**Problema:** Variables de PostgreSQL no están configuradas.

**Solución:**
1. Verifica que agregaste PostgreSQL como servicio
2. Usa la sintaxis `${{Postgres.PGHOST}}` (con dobles llaves)
3. Verifica que el nombre del servicio PostgreSQL sea exactamente `Postgres` (Railway lo crea así por defecto)

### Error: "Port already in use"

**Problema:** Railway asigna el puerto automáticamente.

**Solución:** Cambia tu código para usar `process.env.PORT`:

```typescript
const PORT = process.env.PORT || 3001;
```

Tu código ya lo hace correctamente ✅

### Build tarda mucho

**Solución:** Railway cachea `node_modules` entre builds. El primer build puede tardar más.

## 🔗 Próximos Pasos

Después de deployar el backend:

1. ✅ Anota la URL pública de Railway
2. Deploya el frontend en Vercel
3. Actualiza `FRONTEND_URL` en Railway con la URL de Vercel
4. Actualiza `REACT_APP_API_URL` en Vercel con la URL de Railway
5. Configura webhooks en Mercado Pago

## 📚 Recursos

- [Railway Docs](https://docs.railway.app)
- [Railway - Environment Variables](https://docs.railway.app/develop/variables)
- [Railway - PostgreSQL](https://docs.railway.app/databases/postgresql)

