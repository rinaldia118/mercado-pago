# 🔍 Debug: "No es posible continuar el pago con esta tarjeta"

## ✅ Checklist de Verificación

Sigue estos pasos en orden para identificar el problema:

### 1. Verificar que estás en Sandbox

**En la URL del navegador, después de hacer clic en "Iniciar Compra":**

✅ **CORRECTO:** `https://sandbox.mercadopago.com.ar/checkout/...`  
❌ **INCORRECTO:** `https://www.mercadopago.com.ar/checkout/...`

Si ves `www.mercadopago.com.ar` en lugar de `sandbox.mercadopago.com.ar`, el problema es que no estás usando la URL de sandbox.

**Solución:** Verifica los logs del backend. Deberías ver:
```
URL usada: SANDBOX ✅
```

### 2. Verificar que estás logueado con cuenta de prueba

**En la página de Mercado Pago:**

1. Mira la esquina superior derecha
2. Si ves tu nombre/email real → **CIERRA SESIÓN**
3. Haz clic en "Iniciar sesión" o "Ingresar"
4. Ingresa el **email de la cuenta de prueba del COMPRADOR**
5. Ingresa la **contraseña de la cuenta de prueba**

**⚠️ IMPORTANTE:** Debe ser la cuenta de **COMPRADOR**, no vendedor.

### 3. Verificar los datos de la tarjeta

Usa exactamente estos datos:

- **Número:** `4509 9535 6623 3704` (sin espacios o con espacios, ambos funcionan)
- **CVV:** `123`
- **Fecha de vencimiento:** Cualquier fecha futura, formato `MM/AA` (ej: `11/25`, `12/30`)
- **Nombre del titular:** `APRO` (todo en mayúsculas)

### 4. Verificar en la consola del navegador

Abre la consola del navegador (F12) y verifica:

1. **Antes de redirigir:** Deberías ver:
   ```
   ⚠️ IMPORTANTE: Estás en modo prueba (SANDBOX)
   ✅ URL de sandbox confirmada
   ```

2. **Si ves:** `❌ ERROR: La URL NO es de sandbox!`
   - Significa que tu token es de producción, no de prueba
   - Necesitas obtener el token de prueba correcto

### 5. Verificar los logs del backend

En los logs del backend deberías ver:

```
Modo de la preferencia detectado:
  - Tiene sandbox_init_point: SÍ ✅ (Es SANDBOX)
  - Modo final: SANDBOX/PRUEBA ✅
URL usada: SANDBOX ✅
```

Si ves `NO ⚠️ (Es PRODUCCIÓN)`, el problema es el token.

## 🚨 Problemas Comunes y Soluciones

### Problema 1: "Sigo viendo www.mercadopago.com.ar en la URL"

**Causa:** El token es de producción o no se está usando sandbox_init_point.

**Solución:**
1. Verifica que el token sea de prueba (debe estar en "Credenciales de prueba")
2. Revisa los logs del backend para ver qué URL se está usando
3. Si no ves `sandbox_init_point` en los logs, el token es de producción

### Problema 2: "Ya cerré sesión e inicié con cuenta de prueba pero sigue el error"

**Causa:** Puede que la cuenta de prueba no esté correctamente configurada o no sea de tipo "Comprador".

**Solución:**
1. Ve a https://www.mercadopago.com.ar/developers/panel/test-users
2. Verifica que el usuario sea de tipo **"Comprador"** (Buyer)
3. Si es "Vendedor", créalo nuevamente como "Comprador"
4. Intenta con una ventana de incógnito para evitar problemas de cookies

### Problema 3: "La tarjeta aparece como inválida antes de ingresarla"

**Causa:** Puede ser un problema del navegador o de la validación de Mercado Pago.

**Solución:**
1. Intenta con otro navegador
2. Limpia la caché y cookies
3. Usa modo incógnito
4. Verifica que estés ingresando el número completo: `4509 9535 6623 3704`

### Problema 4: "Todo parece correcto pero sigue sin funcionar"

**Solución:**
1. Verifica que la cuenta de prueba tenga permisos completos
2. Intenta crear una nueva cuenta de prueba del comprador
3. Contacta al soporte de Mercado Pago con:
   - El ID de la preferencia (de los logs)
   - El email de la cuenta de prueba
   - Una captura de pantalla del error

## 📝 Información para Debug

Si el problema persiste, recopila esta información:

1. **URL completa** donde aparece el error
2. **Logs del backend** (especialmente la parte de "Modo de la preferencia")
3. **Consola del navegador** (F12 → Console)
4. **Email de la cuenta de prueba** que estás usando
5. **Tipo de cuenta** (Comprador/Vendedor)

## 🔗 Enlaces Útiles

- [Panel de Usuarios de Prueba](https://www.mercadopago.com.ar/developers/panel/test-users)
- [Documentación de Testing](https://www.mercadopago.com.ar/developers/es/docs/checkout-api/testing)
- [Soporte de Mercado Pago](https://www.mercadopago.com.ar/developers/support)

