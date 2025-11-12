# 🔍 Cómo Verificar Variables de Entorno en Vercel

## ❌ Por qué `process.env` no funciona en la consola del navegador

`process.env` **NO está disponible** en la consola del navegador porque:

1. Las variables de entorno de React se inyectan **durante el build**, no en runtime
2. `process` es un objeto de Node.js, no del navegador
3. En el navegador, las variables ya están "compiladas" en el código JavaScript

---

## ✅ Formas de Verificar las Variables

### Método 1: Console.log en el Código (Recomendado)

Ya agregué un `console.log` en `App.js` que mostrará el valor cuando la app cargue:

```javascript
console.log('🔍 API_URL configurada:', API_URL);
console.log('🔍 REACT_APP_API_URL desde env:', process.env.REACT_APP_API_URL);
```

**Pasos:**
1. Haz commit y push del cambio
2. Vercel hará un nuevo deploy
3. Abre tu app en Vercel
4. Abre la consola del navegador (F12)
5. Deberías ver los logs cuando la página cargue

**Lo que deberías ver:**
```
🔍 API_URL configurada: https://mercado-pago-production.up.railway.app
🔍 REACT_APP_API_URL desde env: https://mercado-pago-production.up.railway.app
```

**Si ves `undefined` o `http://localhost:3001`:**
- La variable no está configurada en Vercel
- O no se hizo redeploy después de configurarla

---

### Método 2: Verificar en Vercel Dashboard

1. Ve a Vercel → Tu proyecto
2. Settings → Environment Variables
3. Busca `REACT_APP_API_URL`
4. Verifica que el valor sea: `https://mercado-pago-production.up.railway.app`

**⚠️ IMPORTANTE:**
- Debe empezar con `https://`
- NO debe terminar con `/`
- Debe estar configurada para **Production**, **Preview** y **Development**

---

### Método 3: Verificar en el Código Compilado

1. Abre tu app en Vercel
2. Abre la consola del navegador (F12)
3. Ve a la pestaña **Network** (Red)
4. Haz clic en "Iniciar Compra"
5. Busca la request a `/api/payments/create-preference`
6. Verifica la URL completa de la request

**URL correcta:**
```
https://mercado-pago-production.up.railway.app/api/payments/create-preference
```

**URL incorrecta (tu problema actual):**
```
https://mercado-pago-two.vercel.app/mercado-pago-production.up.railway.app/api/payments/create-preference
```

---

### Método 4: Inspeccionar el Código Fuente

1. Abre tu app en Vercel
2. Click derecho → **View Page Source** (Ver código fuente)
3. Busca `REACT_APP_API_URL` o `API_URL`
4. Verás cómo se inyectó la variable en el código

---

## 🐛 Problemas Comunes

### Problema: La variable muestra `undefined`

**Causa:** La variable no está configurada o no se hizo redeploy.

**Solución:**
1. Ve a Vercel → Settings → Environment Variables
2. Verifica que `REACT_APP_API_URL` exista
3. Si no existe, créala con el valor correcto
4. **Haz un nuevo deploy** (Redeploy)

### Problema: La variable muestra `http://localhost:3001`

**Causa:** La variable no está configurada, está usando el valor por defecto.

**Solución:**
1. Configura `REACT_APP_API_URL` en Vercel
2. Haz redeploy

### Problema: La URL está mal formada (concatenada)

**Causa:** La variable tiene un valor incorrecto (sin `https://` o con formato incorrecto).

**Solución:**
1. Verifica que el valor sea exactamente: `https://mercado-pago-production.up.railway.app`
2. No debe tener barra final (`/`)
3. Debe empezar con `https://`
4. Haz redeploy

---

## 📋 Checklist de Verificación

- [ ] Variable `REACT_APP_API_URL` existe en Vercel
- [ ] Valor es: `https://mercado-pago-production.up.railway.app` (sin barra final)
- [ ] Variable configurada para Production, Preview y Development
- [ ] Se hizo redeploy después de configurar/actualizar la variable
- [ ] Console.log en el código muestra la URL correcta
- [ ] La request en Network muestra la URL correcta
- [ ] No hay errores de CORS

---

## 💡 Nota Importante

**Las variables de entorno en React:**
- Se inyectan en **tiempo de build**, no en runtime
- Si cambias una variable, **siempre necesitas hacer redeploy**
- No están disponibles en la consola del navegador como `process.env`
- Pero SÍ están disponibles en el código JavaScript compilado

---

## 🧪 Prueba Rápida

Después de hacer los cambios:

1. Haz commit y push:
   ```bash
   git add frontend/src/App.js
   git commit -m "Add debug logs for API_URL"
   git push
   ```

2. Espera a que Vercel haga el deploy

3. Abre tu app y la consola del navegador

4. Deberías ver los logs con la URL correcta

---

¡Con esto podrás verificar fácilmente si la variable está configurada correctamente! 🚀

