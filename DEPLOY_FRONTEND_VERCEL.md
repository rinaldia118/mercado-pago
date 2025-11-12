# 🚀 Deploy del Frontend en Vercel

## ¿Por qué Vercel?

✅ **Gratis** con límites generosos  
✅ **Optimizado para React** - Detecta automáticamente Create React App  
✅ **Deploy automático** desde GitHub  
✅ **HTTPS incluido** automáticamente  
✅ **CDN global** - Tu app carga rápido en todo el mundo  
✅ **Muy fácil** de configurar  
✅ **Preview deployments** - Cada PR tiene su propia URL  

---

## 📋 Pasos para Deploy

### Paso 1: Preparar el Repositorio

Asegúrate de que tu código esté en GitHub:

```bash
git add .
git commit -m "Prepare frontend for Vercel deployment"
git push
```

### Paso 2: Crear Proyecto en Vercel

1. Ve a https://vercel.com
2. Haz clic en **"Sign Up"** o **"Log In"**
3. Conecta tu cuenta de **GitHub** (recomendado)
4. Haz clic en **"Add New..."** → **"Project"**
5. Selecciona tu repositorio `mercado-pago`

### Paso 3: Configurar el Proyecto

Vercel detectará automáticamente que es React, pero necesitas configurar:

#### Configuración del Proyecto:
- **Framework Preset:** Create React App (debería detectarse automáticamente)
- **Root Directory:** `frontend` ⚠️ **IMPORTANTE**
- **Build Command:** `npm run build` (ya viene por defecto)
- **Output Directory:** `build` (ya viene por defecto)
- **Install Command:** `npm install` (ya viene por defecto)

### Paso 4: Variables de Entorno

En la sección **"Environment Variables"**, agrega:

```
REACT_APP_API_URL=https://tu-backend.railway.app
```

**⚠️ IMPORTANTE:** 
- Reemplaza `https://tu-backend.railway.app` con la URL real de tu backend en Railway
- Puedes encontrar esta URL en Railway → Tu servicio backend → Settings → Domains

### Paso 5: Deploy

1. Haz clic en **"Deploy"**
2. Espera a que termine el build (1-2 minutos)
3. ¡Listo! Vercel te dará una URL como: `https://tu-proyecto.vercel.app`

---

## 🔄 Actualizar URLs Después del Deploy

Una vez que tengas la URL de Vercel, necesitas actualizar las variables de entorno:

### En Railway (Backend):
1. Ve a tu proyecto en Railway
2. Selecciona el servicio backend
3. Ve a **Variables**
4. Actualiza `FRONTEND_URL` con la URL de Vercel:
   ```
   FRONTEND_URL=https://tu-proyecto.vercel.app
   ```
5. Railway redeployará automáticamente

### En Vercel (Frontend):
Si cambiaste la URL del backend, actualiza la variable de entorno:
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Actualiza `REACT_APP_API_URL`
4. Haz un nuevo deploy

---

## 🎯 Verificar que Funciona

1. Abre la URL de Vercel en tu navegador
2. Abre la consola del navegador (F12)
3. Haz clic en "Iniciar Compra"
4. Deberías ver las llamadas al backend en la consola
5. Deberías ser redirigido a Mercado Pago

---

## 🔧 Configuración Avanzada (Opcional)

### Configurar Dominio Personalizado

1. En Vercel, ve a Settings → Domains
2. Agrega tu dominio personalizado
3. Sigue las instrucciones para configurar DNS

### Configurar Variables de Entorno por Ambiente

Puedes tener diferentes valores para desarrollo, preview y producción:

- **Production:** `REACT_APP_API_URL=https://tu-backend-prod.railway.app`
- **Preview:** `REACT_APP_API_URL=https://tu-backend-dev.railway.app`
- **Development:** (usa `.env.local` en tu máquina)

---

## 📝 Notas Importantes

1. **Variables de entorno:** En React, las variables deben empezar con `REACT_APP_` para ser accesibles en el código
2. **Rebuild necesario:** Si cambias variables de entorno, necesitas hacer un nuevo deploy
3. **CORS:** Asegúrate de que tu backend en Railway tenga configurado CORS para permitir tu dominio de Vercel
4. **HTTPS:** Vercel proporciona HTTPS automáticamente, no necesitas configurar nada

---

## 🆚 Alternativas a Vercel

Si prefieres otra opción:

### Netlify
- Similar a Vercel
- También gratis y fácil
- URL: https://netlify.com

### Railway (también)
- Puedes deployar el frontend en Railway
- Pero Vercel/Netlify son mejores para SPAs estáticas
- Si quieres todo en Railway, puedes usar el Dockerfile del frontend

### Render
- Otra opción gratuita
- URL: https://render.com

---

## 🐛 Solución de Problemas

### Error: "Cannot find module"
- Asegúrate de que `package.json` tenga todas las dependencias
- Verifica que el Root Directory sea `frontend`

### Error: CORS
- Verifica que `FRONTEND_URL` en Railway sea la URL correcta de Vercel
- Revisa la configuración de CORS en el backend

### La app no carga
- Revisa los logs de build en Vercel
- Verifica que `REACT_APP_API_URL` esté configurada correctamente
- Abre la consola del navegador para ver errores

---

## ✅ Checklist Final

- [ ] Código en GitHub
- [ ] Proyecto creado en Vercel
- [ ] Root Directory configurado como `frontend`
- [ ] Variable `REACT_APP_API_URL` configurada con la URL de Railway
- [ ] Deploy exitoso
- [ ] `FRONTEND_URL` actualizada en Railway
- [ ] Probado que funciona end-to-end

¡Listo! Tu frontend debería estar funcionando en Vercel 🎉

