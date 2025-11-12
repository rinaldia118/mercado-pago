# 🔧 Solución: BACKEND_URL undefined

## ❌ Problema Detectado

En los logs ves:
```
BACKEND_URL: undefined
backendUrl: http://localhost:3001
notification_url: "http://localhost:3001/api/payments/webhook"
```

Esto significa que la variable `BACKEND_URL` no está configurada en Railway.

---

## ✅ Solución

### Paso 1: Configurar BACKEND_URL en Railway

1. Ve a Railway → Tu proyecto → Tu servicio backend
2. Ve a la pestaña **Variables**
3. Busca la variable `BACKEND_URL`

**Si NO existe:**
1. Haz clic en **New Variable**
2. **Key:** `BACKEND_URL`
3. **Value:** `https://mercado-pago-production.up.railway.app`
   - O mejor aún, usa: `${{RAILWAY_PUBLIC_DOMAIN}}`
   - Esta variable especial de Railway se actualiza automáticamente con la URL de tu servicio
4. Haz clic en **Save**

**Si YA existe pero está mal:**
1. Haz clic en los **tres puntos** (⋯) → **Edit**
2. Cambia el valor a: `https://mercado-pago-production.up.railway.app`
   - O usa: `${{RAILWAY_PUBLIC_DOMAIN}}`
3. Guarda

### Paso 2: Verificar después del Redeploy

Después de configurar la variable, Railway hará redeploy automáticamente. En los logs deberías ver:

```
BACKEND_URL: https://mercado-pago-production.up.railway.app
backendUrl: https://mercado-pago-production.up.railway.app
notification_url: "https://mercado-pago-production.up.railway.app/api/payments/webhook"
```

---

## 🔍 Sobre el Token y sandbox_init_point

Aunque tu token empiece con `APP_USR-`, Mercado Pago está devolviendo `sandbox_init_point`. Esto puede pasar por:

### Posibilidad 1: El token es de prueba

A veces los tokens de prueba también pueden empezar con `APP_USR-`. Verifica:

1. Ve a: https://www.mercadopago.com.ar/developers/panel/credentials
2. Verifica que estés en la sección **"Credenciales de producción"** (NO "Credenciales de prueba")
3. Copia el Access Token de producción
4. Asegúrate de que sea el correcto

### Posibilidad 2: Configuración en Mercado Pago

Algunas cuentas de Mercado Pago tienen configuraciones que pueden afectar esto. Verifica en el panel de Mercado Pago.

---

## 📋 Checklist Completo

- [ ] Variable `BACKEND_URL` configurada en Railway
- [ ] Valor es: `https://mercado-pago-production.up.railway.app` o `${{RAILWAY_PUBLIC_DOMAIN}}`
- [ ] Se hizo redeploy después de configurar
- [ ] Los logs muestran `BACKEND_URL: https://...` (no undefined)
- [ ] `notification_url` en los logs muestra la URL de Railway (no localhost)
- [ ] Token de producción verificado en el panel de Mercado Pago

---

## ⚠️ Importante

**El webhook NO funcionará** si `notification_url` es `http://localhost:3001` porque:
- Mercado Pago no puede acceder a localhost
- Necesita una URL pública (HTTPS)

**Después de corregir `BACKEND_URL`, el webhook funcionará correctamente.**

---

¡Con esto debería solucionarse! 🚀

