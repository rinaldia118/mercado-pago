# 🔧 Solución: Error 405 en Vercel - URL Mal Formada

## ❌ Problema

La URL de la request está mal formada:
```
https://mercado-pago-two.vercel.app/mercado-pago-production.up.railway.app/api/payments/create-preference
```

Esto indica que la variable de entorno `REACT_APP_API_URL` en Vercel está mal configurada.

---

## ✅ Solución

### Paso 1: Verificar la Variable de Entorno en Vercel

1. Ve a tu proyecto en Vercel: https://vercel.com
2. Selecciona tu proyecto `mercado-pago-two`
3. Ve a **Settings** → **Environment Variables**
4. Busca la variable `REACT_APP_API_URL`

### Paso 2: Corregir el Valor

La variable `REACT_APP_API_URL` debe tener el valor **completo** de la URL de Railway:

**✅ CORRECTO:**
```
https://mercado-pago-production.up.railway.app
```

**❌ INCORRECTOS:**
```
mercado-pago-production.up.railway.app          ← Falta https://
http://mercado-pago-production.up.railway.app  ← Usa http en lugar de https
https://mercado-pago-production.up.railway.app/ ← Tiene barra final (no debe tener)
```

### Paso 3: Actualizar la Variable

1. Si la variable existe pero está mal:
   - Haz clic en los **tres puntos** (⋯) junto a la variable
   - Selecciona **Edit**
   - Corrige el valor a: `https://mercado-pago-production.up.railway.app`
   - **NO agregues barra final** (`/`)
   - Haz clic en **Save**

2. Si la variable no existe:
   - Haz clic en **Add New**
   - **Key:** `REACT_APP_API_URL`
   - **Value:** `https://mercado-pago-production.up.railway.app`
   - Selecciona los ambientes: **Production**, **Preview**, **Development**
   - Haz clic en **Save**

### Paso 4: Hacer Nuevo Deploy

**⚠️ IMPORTANTE:** Después de cambiar variables de entorno, necesitas hacer un nuevo deploy:

1. Ve a la pestaña **Deployments**
2. Haz clic en los **tres puntos** (⋯) del último deployment
3. Selecciona **Redeploy**
4. O simplemente haz un nuevo commit y push (Vercel deployará automáticamente)

---

## 🔍 Verificar que Está Correcto

### Opción 1: Desde la Consola del Navegador

1. Abre tu app en Vercel
2. Abre la consola del navegador (F12)
3. Antes de hacer clic en el botón, ejecuta en la consola:
   ```javascript
   console.log(process.env.REACT_APP_API_URL);
   ```
4. Deberías ver: `https://mercado-pago-production.up.railway.app`

### Opción 2: Verificar en el Código

El código en `App.js` usa:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
```

Cuando hagas la request, debería ser:
```javascript
axios.post(`${API_URL}/api/payments/create-preference`, ...)
```

Que debería resultar en:
```
https://mercado-pago-production.up.railway.app/api/payments/create-preference
```

---

## 🐛 Otros Problemas Comunes

### Error 405 (Method Not Allowed)

Si después de corregir la URL sigues obteniendo 405:

1. **Verifica que el endpoint sea POST:**
   - El código usa `axios.post()`, que es correcto
   - El endpoint en Railway es `POST /api/payments/create-preference`

2. **Verifica CORS en Railway:**
   - Asegúrate de que `FRONTEND_URL` en Railway sea: `https://mercado-pago-two.vercel.app`
   - Debe coincidir exactamente con tu dominio de Vercel

3. **Verifica que el backend esté corriendo:**
   ```bash
   curl https://mercado-pago-production.up.railway.app/health
   ```
   Deberías recibir: `{"status":"ok"}`

### Error CORS

Si ves errores de CORS en la consola:

1. Ve a Railway → Tu servicio backend → Variables
2. Verifica que `FRONTEND_URL` sea: `https://mercado-pago-two.vercel.app`
3. Haz un redeploy del backend en Railway

---

## 📋 Checklist de Verificación

- [ ] Variable `REACT_APP_API_URL` existe en Vercel
- [ ] Valor es: `https://mercado-pago-production.up.railway.app` (sin barra final)
- [ ] Variable está configurada para Production, Preview y Development
- [ ] Se hizo un nuevo deploy después de cambiar la variable
- [ ] La consola del navegador muestra la URL correcta
- [ ] El backend responde en `/health`
- [ ] `FRONTEND_URL` en Railway coincide con el dominio de Vercel

---

## 🧪 Probar la Conexión

Después de corregir todo:

1. Abre tu app en Vercel
2. Abre la consola del navegador (F12)
3. Haz clic en "Iniciar Compra"
4. En la consola deberías ver:
   - La request a: `https://mercado-pago-production.up.railway.app/api/payments/create-preference`
   - La respuesta del backend con `initPoint` o `sandboxInitPoint`
   - Redirección a Mercado Pago

---

## 💡 Nota Importante

**Las variables de entorno en React:**
- Deben empezar con `REACT_APP_` para ser accesibles
- Se inyectan en el código en tiempo de **build**, no en runtime
- Si cambias una variable, **siempre necesitas hacer un nuevo deploy**

---

¡Con esto debería funcionar! 🚀

