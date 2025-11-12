# ⚙️ Configuración de Vercel - Valores Exactos

## 📋 Configuración del Proyecto

### Root Directory
```
frontend
```

### Framework Preset
```
Create React App
```
(Vercel debería detectarlo automáticamente)

---

## 🔨 Build Settings

### Install Command
```
npm install
```
*(Este es el valor por defecto, puedes dejarlo vacío si quieres)*

### Build Command
```
npm run build
```
*(O simplemente: `npm run build`)*

### Output Directory
```
build
```
*(Create React App genera los archivos compilados en la carpeta `build`)*

---

## 🔐 Environment Variables (Variables de Entorno)

Solo necesitas **UNA** variable de entorno:

### Variable 1: `REACT_APP_API_URL`

**Nombre:**
```
REACT_APP_API_URL
```

**Valor:**
```
https://tu-backend.railway.app
```

**⚠️ IMPORTANTE:** 
- Reemplaza `tu-backend.railway.app` con la URL **real** de tu backend en Railway
- Puedes encontrar esta URL en Railway → Tu servicio backend → Settings → Domains
- Debe empezar con `https://` y NO debe terminar con `/`

**Ejemplo real:**
```
REACT_APP_API_URL=https://mercado-pago-backend-production.up.railway.app
```

---

## 📝 Resumen Rápido

| Campo | Valor |
|-------|-------|
| **Root Directory** | `frontend` |
| **Framework Preset** | `Create React App` |
| **Install Command** | `npm install` (o déjalo vacío) |
| **Build Command** | `npm run build` |
| **Output Directory** | `build` |
| **Environment Variable 1** | `REACT_APP_API_URL` = `https://tu-backend.railway.app` |

---

## ✅ Checklist

- [ ] Root Directory configurado como `frontend`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `build`
- [ ] Variable `REACT_APP_API_URL` configurada con la URL de Railway
- [ ] La URL de Railway empieza con `https://` y no termina con `/`

---

## 🔄 Después del Deploy

Una vez que Vercel te dé la URL del frontend (ej: `https://tu-proyecto.vercel.app`):

1. Ve a Railway → Tu servicio backend → Variables
2. Actualiza `FRONTEND_URL` con la URL de Vercel:
   ```
   FRONTEND_URL=https://tu-proyecto.vercel.app
   ```
3. Railway redeployará automáticamente

---

## 🐛 Problemas Comunes

### "Build failed: Cannot find module"
- Verifica que el Root Directory sea `frontend`
- Asegúrate de que `package.json` esté en la carpeta `frontend`

### "Output directory not found"
- Verifica que el Output Directory sea `build` (no `dist` ni otra cosa)
- Create React App siempre genera los archivos en `build`

### La app no se conecta al backend
- Verifica que `REACT_APP_API_URL` tenga la URL correcta de Railway
- Asegúrate de que la URL empiece con `https://`
- Verifica que el backend esté corriendo en Railway
- Revisa la consola del navegador (F12) para ver errores de CORS

---

## 💡 Nota sobre Variables de Entorno

En React, las variables de entorno deben empezar con `REACT_APP_` para ser accesibles en el código.

Si necesitas agregar más variables en el futuro, recuerda:
- ✅ `REACT_APP_ALGO` → Accesible en el código
- ❌ `ALGO` → NO accesible en el código

---

¡Listo! Con estos valores deberías poder hacer el deploy sin problemas 🚀

