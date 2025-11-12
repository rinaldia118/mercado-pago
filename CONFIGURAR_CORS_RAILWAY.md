# 🔒 Configurar CORS en Railway

## ✅ Verificación

El backend ya tiene CORS configurado usando la variable de entorno `FRONTEND_URL`:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

---

## 📋 Pasos para Configurar

### Paso 1: Agregar Variable en Railway

1. Ve a Railway → Tu proyecto → Tu servicio backend
2. Ve a la pestaña **Variables**
3. Busca la variable `FRONTEND_URL`

### Paso 2: Configurar el Valor

**Si la variable NO existe:**
1. Haz clic en **New Variable**
2. **Key:** `FRONTEND_URL`
3. **Value:** `https://mercado-pago-two.vercel.app`
   - ⚠️ **IMPORTANTE:** Debe ser exactamente la URL de Vercel
   - Debe empezar con `https://`
   - NO debe terminar con `/`
4. Haz clic en **Save**

**Si la variable YA existe:**
1. Haz clic en los **tres puntos** (⋯) junto a la variable
2. Selecciona **Edit**
3. Cambia el valor a: `https://mercado-pago-two.vercel.app`
4. Haz clic en **Save**

---

## 🔍 Verificar que Está Configurado

### Opción 1: Desde Railway Dashboard

1. Ve a Railway → Tu servicio backend → Variables
2. Busca `FRONTEND_URL`
3. Verifica que el valor sea: `https://mercado-pago-two.vercel.app`

### Opción 2: Desde los Logs

Después de hacer redeploy, los logs deberían mostrar la URL del frontend cuando se crea una preferencia.

### Opción 3: Probar desde el Frontend

1. Abre tu app en Vercel: https://mercado-pago-two.vercel.app
2. Abre la consola del navegador (F12)
3. Haz clic en "Iniciar Compra"
4. Si CORS está bien configurado, la request debería funcionar
5. Si hay error de CORS, verás un mensaje en la consola

---

## ⚠️ Errores Comunes de CORS

### Error: "Access to XMLHttpRequest has been blocked by CORS policy"

**Causa:** La URL del frontend no está en la lista de orígenes permitidos.

**Solución:**
1. Verifica que `FRONTEND_URL` en Railway sea exactamente: `https://mercado-pago-two.vercel.app`
2. Asegúrate de que NO tenga barra final (`/`)
3. Haz redeploy del backend en Railway

### Error: "No 'Access-Control-Allow-Origin' header"

**Causa:** CORS no está configurado o la variable está mal.

**Solución:**
1. Verifica que la variable `FRONTEND_URL` exista en Railway
2. Verifica que el valor sea correcto
3. Haz redeploy

---

## 🔄 Después de Cambiar la Variable

**⚠️ IMPORTANTE:** Después de cambiar `FRONTEND_URL` en Railway:

1. Railway hará un **redeploy automático** del backend
2. Espera a que termine el deploy
3. Prueba nuevamente desde el frontend

---

## 📋 Checklist

- [ ] Variable `FRONTEND_URL` existe en Railway
- [ ] Valor es: `https://mercado-pago-two.vercel.app` (sin barra final)
- [ ] Se hizo redeploy después de configurar/actualizar
- [ ] No hay errores de CORS en la consola del navegador
- [ ] Las requests desde Vercel funcionan correctamente

---

## 💡 Nota

Si en el futuro cambias el dominio de Vercel o agregas otros dominios (como un dominio personalizado), necesitarás:

1. Actualizar `FRONTEND_URL` en Railway con la nueva URL
2. O modificar el código para aceptar múltiples orígenes (array en lugar de string)

---

¡Con esto debería funcionar el CORS correctamente! 🚀

