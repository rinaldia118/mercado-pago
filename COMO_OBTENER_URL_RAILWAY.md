# 🔗 Cómo Obtener la URL del Backend en Railway

Hay **3 formas** de encontrar la URL de tu backend en Railway:

---

## ✅ Método 1: Desde Settings → Networking (Más Fácil)

### Pasos:

1. Ve a tu proyecto en Railway: https://railway.app
2. Haz clic en el **servicio backend** (el que tiene tu aplicación Node.js)
3. Ve a la pestaña **"Settings"** (Configuración)
4. Busca la sección **"Networking"** o **"Domains"**
5. Ahí verás tu URL pública

### Si NO tienes dominio aún:

1. En la sección **"Networking"**, verás un botón **"Generate Domain"** o **"Add Domain"**
2. Haz clic en ese botón
3. Railway generará automáticamente una URL como:
   ```
   https://tu-backend-production.up.railway.app
   ```
   o
   ```
   https://tu-proyecto-production.up.railway.app
   ```

### 📍 Ubicación exacta en la interfaz:

```
Railway Dashboard
  └── Tu Proyecto
      └── Servicio Backend
          └── Settings (pestaña)
              └── Networking / Domains
                  └── [Aquí está tu URL] 🌐
```

---

## ✅ Método 2: Desde la Página Principal del Servicio

### Pasos:

1. Ve a tu proyecto en Railway
2. Haz clic en el **servicio backend**
3. En la página principal del servicio, a veces Railway muestra la URL directamente
4. Busca un texto que diga algo como:
   - **"Public URL"**
   - **"Domain"**
   - O simplemente una URL que empiece con `https://`

---

## ✅ Método 3: Desde Deployments (Logs)

### Pasos:

1. Ve a tu proyecto en Railway
2. Haz clic en el **servicio backend**
3. Ve a la pestaña **"Deployments"**
4. Haz clic en el último deployment
5. Haz clic en **"View Logs"**
6. A veces Railway muestra la URL en los logs cuando el servidor inicia

---

## 🎯 Ejemplo de URL

Tu URL de Railway se verá algo así:

```
https://mercado-pago-backend-production.up.railway.app
```

O:

```
https://tu-proyecto-production.up.railway.app
```

**Formato:**
- Empieza con `https://`
- Tiene el nombre de tu proyecto o servicio
- Termina con `.up.railway.app`

---

## ⚠️ Si NO ves ninguna URL

### Opción 1: Generar dominio manualmente

1. Ve a **Settings** → **Networking**
2. Busca el botón **"Generate Domain"** o **"Add Domain"**
3. Haz clic y Railway creará uno automáticamente

### Opción 2: Verificar que el servicio esté deployado

1. Ve a **Deployments**
2. Verifica que haya un deployment exitoso
3. Si no hay deployment, Railway no generará la URL hasta que haya uno

### Opción 3: Verificar configuración

Asegúrate de que:
- El servicio esté corriendo (no pausado)
- Haya un deployment exitoso
- El puerto esté configurado correctamente

---

## 📋 Checklist

- [ ] Encontré la URL en Settings → Networking
- [ ] La URL empieza con `https://`
- [ ] La URL termina con `.up.railway.app`
- [ ] Puedo acceder a la URL en el navegador
- [ ] El endpoint `/health` funciona: `https://tu-url.railway.app/health`

---

## 🧪 Probar que la URL Funciona

Una vez que tengas la URL, pruébala:

### Desde el navegador:
```
https://tu-backend.railway.app/health
```

Deberías ver:
```json
{"status":"ok"}
```

### Desde la terminal:
```bash
curl https://tu-backend.railway.app/health
```

### Verificar conexión a DB:
```bash
curl https://tu-backend.railway.app/health/db
```

---

## 💡 Consejo

**Guarda la URL** en un lugar seguro porque la necesitarás para:
- Configurar `REACT_APP_API_URL` en Vercel
- Configurar webhooks en Mercado Pago
- Probar la API desde Postman o curl

---

## 🔄 Si Cambias de Plan o Servicio

Si cambias de plan o recreas el servicio, Railway puede generar una nueva URL. Siempre verifica la URL actual en **Settings → Networking**.

---

¡Esa es la URL que necesitas copiar y pegar en Vercel como `REACT_APP_API_URL`! 🚀

