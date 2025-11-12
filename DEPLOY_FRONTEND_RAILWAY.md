# 🚂 Deploy del Frontend en Railway (Alternativa)

Si prefieres tener **todo en Railway** (frontend + backend), puedes deployar el frontend también ahí.

## ⚠️ Consideraciones

**Ventajas:**
- ✅ Todo en un solo lugar
- ✅ Mismo proveedor que el backend
- ✅ Fácil de gestionar

**Desventajas:**
- ⚠️ Railway no está optimizado para SPAs estáticas (como Vercel/Netlify)
- ⚠️ Puede ser más lento que Vercel para servir archivos estáticos
- ⚠️ Necesitas usar Dockerfile (más configuración)

**Recomendación:** Usa **Vercel** para el frontend (ver `DEPLOY_FRONTEND_VERCEL.md`), pero si prefieres Railway, aquí está cómo hacerlo.

---

## 📋 Pasos para Deploy en Railway

### Paso 1: Crear railway.json para Frontend

Crea un archivo `frontend/railway.json`:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "DOCKERFILE",
    "dockerfilePath": "Dockerfile"
  }
}
```

### Paso 2: Crear Nuevo Servicio en Railway

1. Ve a tu proyecto en Railway
2. Haz clic en **"New"** (botón verde)
3. Selecciona **"GitHub Repo"** o **"Empty Service"**
4. Si usas GitHub Repo:
   - Selecciona el mismo repositorio
   - Railway creará un nuevo servicio

### Paso 3: Configurar el Servicio

1. Haz clic en el nuevo servicio
2. Ve a **Settings**
3. Configura:
   - **Root Directory:** `frontend`
   - **Build Command:** (no necesario, usa Dockerfile)
   - **Start Command:** (no necesario, usa Dockerfile)

### Paso 4: Variables de Entorno

En la pestaña **Variables**, agrega:

```
REACT_APP_API_URL=https://tu-backend.railway.app
```

**⚠️ IMPORTANTE:** Reemplaza con la URL real de tu backend en Railway.

### Paso 5: Configurar Puerto

Railway asignará un puerto automáticamente. El Dockerfile ya está configurado para usar el puerto 80 (nginx).

### Paso 6: Deploy

Railway detectará el Dockerfile y hará el deploy automáticamente.

---

## 🔧 Ajustar Dockerfile si es Necesario

El Dockerfile actual debería funcionar, pero si tienes problemas, puedes usar este:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

---

## 🔄 Actualizar URLs

Después del deploy:

1. Railway te dará una URL para el frontend
2. Actualiza `FRONTEND_URL` en el servicio backend con esta URL
3. Railway redeployará el backend automáticamente

---

## 🆚 Vercel vs Railway para Frontend

| Característica | Vercel | Railway |
|---------------|--------|---------|
| Optimizado para React | ✅ Sí | ⚠️ No específicamente |
| CDN Global | ✅ Sí | ⚠️ Limitado |
| Configuración | ✅ Muy fácil | ⚠️ Requiere Dockerfile |
| Deploy automático | ✅ Sí | ✅ Sí |
| Gratis | ✅ Sí | ✅ Sí (con créditos) |
| Velocidad | ✅ Muy rápido | ⚠️ Normal |

**Recomendación:** Usa **Vercel** para el frontend a menos que tengas una razón específica para usar Railway.

---

## ✅ Checklist

- [ ] `railway.json` creado en `frontend/`
- [ ] Nuevo servicio creado en Railway
- [ ] Root Directory configurado como `frontend`
- [ ] Variable `REACT_APP_API_URL` configurada
- [ ] Deploy exitoso
- [ ] `FRONTEND_URL` actualizada en el servicio backend
- [ ] Probado que funciona

