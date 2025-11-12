# 🚀 Guía de Deployment - Frontend y Backend

## 📋 Requisitos del Proyecto

- **Backend:** Node.js + TypeScript + Express
- **Frontend:** React (SPA)
- **Base de datos:** PostgreSQL
- **Webhooks:** Necesita URL pública (para notificaciones de Mercado Pago)

---

## 🆓 Opciones Gratuitas (Para Desarrollo/Pruebas)

### 1. **Vercel** (Frontend) + **Railway** (Backend + DB) ⭐ Recomendado

#### Frontend en Vercel
- ✅ **Gratis** con límites generosos
- ✅ Deploy automático desde GitHub
- ✅ HTTPS incluido
- ✅ CDN global
- ✅ Muy fácil de usar

**Pasos:**
1. Conecta tu repositorio de GitHub a Vercel
2. Selecciona el directorio `frontend`
3. Configura variables de entorno
4. Deploy automático

**URL:** https://vercel.com

#### Backend + PostgreSQL en Railway
- ✅ **Gratis** con $5 de crédito mensual
- ✅ PostgreSQL incluido
- ✅ Deploy desde GitHub
- ✅ Variables de entorno fáciles
- ✅ Logs en tiempo real

**Pasos:**
1. Conecta tu repositorio a Railway
2. Crea un servicio para el backend
3. Agrega PostgreSQL como servicio adicional
4. Configura variables de entorno
5. Railway te da una URL pública automáticamente

**URL:** https://railway.app

---

### 2. **Netlify** (Frontend) + **Render** (Backend + DB)

#### Frontend en Netlify
- ✅ **Gratis** con límites generosos
- ✅ Deploy automático
- ✅ HTTPS incluido
- ✅ Formularios y funciones serverless

**URL:** https://netlify.com

#### Backend + PostgreSQL en Render
- ✅ **Gratis** (con limitaciones)
- ✅ PostgreSQL gratuito (con límites)
- ✅ Deploy automático
- ✅ HTTPS incluido
- ⚠️ Se "duerme" después de 15 min de inactividad (gratis)

**URL:** https://render.com

---

### 3. **Fly.io** (Todo en uno)

- ✅ **Gratis** con límites generosos
- ✅ Puedes deployar frontend, backend y PostgreSQL
- ✅ Múltiples regiones
- ✅ Muy rápido

**URL:** https://fly.io

---

## 💰 Opciones de Pago (Para Producción)

### 1. **AWS** (Amazon Web Services)

**Servicios recomendados:**
- **Frontend:** S3 + CloudFront
- **Backend:** EC2 o Elastic Beanstalk
- **Base de datos:** RDS (PostgreSQL)
- **Webhooks:** API Gateway

**Ventajas:**
- ✅ Muy escalable
- ✅ Confiable
- ✅ Muchos servicios disponibles

**Desventajas:**
- ❌ Puede ser complejo para principiantes
- ❌ Costos pueden subir rápido

**URL:** https://aws.amazon.com

---

### 2. **Google Cloud Platform (GCP)**

**Servicios recomendados:**
- **Frontend:** Firebase Hosting o Cloud Storage
- **Backend:** Cloud Run o App Engine
- **Base de datos:** Cloud SQL (PostgreSQL)

**Ventajas:**
- ✅ $300 de crédito gratis para empezar
- ✅ Buena integración con otras herramientas de Google

**URL:** https://cloud.google.com

---

### 3. **DigitalOcean**

**Servicios recomendados:**
- **Frontend:** App Platform
- **Backend:** App Platform
- **Base de datos:** Managed Databases (PostgreSQL)

**Ventajas:**
- ✅ Precios predecibles
- ✅ Fácil de usar
- ✅ Buena documentación

**Precio:** Desde $5/mes

**URL:** https://digitalocean.com

---

### 4. **Heroku**

**Ventajas:**
- ✅ Muy fácil de usar
- ✅ Add-ons disponibles (PostgreSQL incluido)
- ✅ Deploy con Git

**Desventajas:**
- ❌ Ya no tiene plan gratuito
- ❌ Puede ser caro para producción

**Precio:** Desde $7/mes

**URL:** https://heroku.com

---

## 🎯 Recomendación por Caso de Uso

### Para Desarrollo/Pruebas (Gratis)
**Frontend:** Vercel  
**Backend + DB:** Railway  
**Razón:** Fácil, gratis, y Railway te da URL pública para webhooks

### Para Producción (Pago)
**Opción 1 (Fácil):** DigitalOcean App Platform  
**Opción 2 (Escalable):** AWS  
**Opción 3 (Económico):** Fly.io

---

## 📝 Configuración Necesaria

### Variables de Entorno para Producción

#### Backend (.env)
```env
NODE_ENV=production
PORT=3001
DB_HOST=tu-host-postgres
DB_PORT=5432
DB_USERNAME=tu-usuario
DB_PASSWORD=tu-password
DB_NAME=mercadopago
FRONTEND_URL=https://tu-frontend.vercel.app
BACKEND_URL=https://tu-backend.railway.app
MERCADOPAGO_ACCESS_TOKEN=tu-token-de-produccion
MERCADOPAGO_TEST_MODE=false
```

#### Frontend
```env
REACT_APP_API_URL=https://tu-backend.railway.app
```

---

## 🔧 Pasos para Deploy (Ejemplo: Vercel + Railway)

### 1. Preparar el Código

#### Backend
Asegúrate de tener un script `start` en `package.json`:
```json
{
  "scripts": {
    "start": "node dist/index.js",
    "build": "tsc"
  }
}
```

#### Frontend
Asegúrate de tener `build` en `package.json`:
```json
{
  "scripts": {
    "build": "react-scripts build"
  }
}
```

### 2. Deploy Backend en Railway

1. Ve a https://railway.app
2. Crea cuenta (con GitHub)
3. "New Project" → "Deploy from GitHub repo"
4. Selecciona tu repositorio
5. Railway detecta Node.js automáticamente
6. Agrega PostgreSQL:
   - "New" → "Database" → "Add PostgreSQL"
7. Configura variables de entorno:
   - `NODE_ENV=production`
   - `PORT=3001`
   - `DB_HOST=${{Postgres.PGHOST}}`
   - `DB_PORT=${{Postgres.PGPORT}}`
   - `DB_USERNAME=${{Postgres.PGUSER}}`
   - `DB_PASSWORD=${{Postgres.PGPASSWORD}}`
   - `DB_NAME=${{Postgres.PGDATABASE}}`
   - `FRONTEND_URL=https://tu-frontend.vercel.app`
   - `BACKEND_URL=${{RAILWAY_PUBLIC_DOMAIN}}`
   - `MERCADOPAGO_ACCESS_TOKEN=tu-token`
8. Railway te da una URL pública automáticamente

### 3. Deploy Frontend en Vercel

1. Ve a https://vercel.com
2. Crea cuenta (con GitHub)
3. "New Project" → Importa tu repositorio
4. Configuración:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
5. Variables de entorno:
   - `REACT_APP_API_URL=https://tu-backend.railway.app`
6. Deploy

### 4. Actualizar URLs

Después de obtener las URLs:
1. Actualiza `FRONTEND_URL` en Railway con la URL de Vercel
2. Actualiza `REACT_APP_API_URL` en Vercel con la URL de Railway
3. Haz redeploy de ambos

---

## 🔔 Configurar Webhooks en Mercado Pago

Una vez que tengas tu backend deployado:

1. Ve a tu panel de Mercado Pago
2. Configuración → Webhooks
3. Agrega la URL: `https://tu-backend.railway.app/api/payments/webhook`
4. Selecciona los eventos que quieres recibir (payment, merchant_order, etc.)

---

## 🧪 Testing del Deployment

### Verificar Backend
```bash
curl https://tu-backend.railway.app/health
```

### Verificar Frontend
Abre en el navegador: `https://tu-frontend.vercel.app`

### Verificar Webhook
Puedes usar herramientas como:
- https://webhook.site (para testing)
- https://requestbin.com (para debugging)

---

## 📚 Recursos Adicionales

### Documentación de Deployment

- [Vercel - Deploy React](https://vercel.com/docs/frameworks/react)
- [Railway - Getting Started](https://docs.railway.app/getting-started)
- [Render - Deploy Guide](https://render.com/docs)
- [Fly.io - Deploy Guide](https://fly.io/docs/getting-started)

### Herramientas Útiles

- [ngrok](https://ngrok.com) - Túnel para desarrollo local (webhooks)
- [Postman](https://postman.com) - Testing de APIs
- [PM2](https://pm2.keymetrics.io) - Process manager para Node.js

---

## ⚠️ Consideraciones Importantes

### Seguridad

1. **Nunca commitees** archivos `.env` al repositorio
2. Usa variables de entorno en la plataforma de deployment
3. En producción, usa tokens de **producción** de Mercado Pago
4. Configura CORS correctamente (solo tu dominio frontend)

### Base de Datos

1. En producción, **NO uses** `synchronize: true` en TypeORM
2. Usa migraciones para cambios en la base de datos
3. Haz backups regulares

### Performance

1. Frontend: Usa build de producción (`npm run build`)
2. Backend: Compila TypeScript antes de deployar
3. Considera usar CDN para assets estáticos

---

## 🎯 Checklist de Deployment

Antes de deployar a producción:

- [ ] Cambiar `NODE_ENV=production`
- [ ] Usar token de **producción** de Mercado Pago
- [ ] Configurar `FRONTEND_URL` y `BACKEND_URL` correctamente
- [ ] Desactivar `synchronize` en TypeORM
- [ ] Configurar CORS solo para tu dominio
- [ ] Configurar webhooks en Mercado Pago
- [ ] Probar que los webhooks funcionen
- [ ] Configurar dominio personalizado (opcional)
- [ ] Configurar SSL/HTTPS (generalmente automático)
- [ ] Configurar monitoreo y logs
- [ ] Hacer backup de la base de datos

