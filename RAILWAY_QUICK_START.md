# 🚀 Railway Quick Start - Sin Docker

## ⚡ Configuración Rápida (5 minutos)

### 1️⃣ Conectar Repositorio
```
Railway → New Project → Deploy from GitHub → Selecciona tu repo
```

### 2️⃣ Configurar Servicio
```
Settings → Root Directory: backend
```

### 3️⃣ Agregar PostgreSQL
```
New → Database → Add PostgreSQL
```

### 4️⃣ Variables de Entorno
En **Variables**, agrega:

```env
NODE_ENV=production
PORT=3001

DB_HOST=${{Postgres.PGHOST}}
DB_PORT=${{Postgres.PGPORT}}
DB_USERNAME=${{Postgres.PGUSER}}
DB_PASSWORD=${{Postgres.PGPASSWORD}}
DB_NAME=${{Postgres.PGDATABASE}}

FRONTEND_URL=https://tu-frontend.vercel.app
BACKEND_URL=${{RAILWAY_PUBLIC_DOMAIN}}

MERCADOPAGO_ACCESS_TOKEN=tu-token-aqui
MERCADOPAGO_TEST_MODE=false
```

### 5️⃣ Generar URL Pública
```
Settings → Networking → Generate Domain
```

### 6️⃣ ¡Listo! 🎉
Railway automáticamente:
- ✅ Detecta Node.js
- ✅ Ejecuta `npm install`
- ✅ Ejecuta `npm run build`
- ✅ Ejecuta `npm start`

## 🔍 Verificar que Funciona

```bash
curl https://tu-backend.railway.app/health
```

Deberías recibir: `{"status":"ok"}`

## 📝 Notas Importantes

- **Root Directory:** Debe ser exactamente `backend` (sin `/`)
- **Variables PostgreSQL:** Usa `${{Postgres.*}}` (con dobles llaves)
- **BACKEND_URL:** Usa `${{RAILWAY_PUBLIC_DOMAIN}}` (Railway lo genera automáticamente)
- **FRONTEND_URL:** Actualízala después de deployar el frontend en Vercel

## 🆘 Si algo falla

1. Revisa los **Logs** en Railway (pestaña Deployments → View Logs)
2. Verifica que **Root Directory** sea `backend`
3. Verifica que todas las **Variables de Entorno** estén configuradas
4. Asegúrate de que PostgreSQL esté agregado como servicio

