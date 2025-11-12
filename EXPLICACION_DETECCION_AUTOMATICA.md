# 🔍 Explicación: Detección Automática del Modo

## ¿Qué significa "detecta automáticamente"?

Significa que el código **no asume** en qué modo estás, sino que **pregunta a Mercado Pago** y mira su respuesta para saberlo.

---

## 🔄 Flujo Completo

### Paso 1: Crear la Preferencia

```typescript
const response = await preference.create({ body: preferenceData });
```

Aquí envías la request a Mercado Pago usando el Access Token que tengas configurado.

### Paso 2: Mercado Pago Responde

Mercado Pago devuelve un objeto con información sobre la preferencia creada:

**Si usaste un Token de PRUEBA:**
```json
{
  "id": "123456789",
  "init_point": "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=...",
  "sandbox_init_point": "https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=..."
  // ↑ Este campo SOLO existe si usaste token de prueba
}
```

**Si usaste un Token de PRODUCCIÓN:**
```json
{
  "id": "123456789",
  "init_point": "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=...",
  // ↑ NO hay sandbox_init_point porque es producción
}
```

### Paso 3: El Código Detecta el Modo

```typescript
// Verifica si la respuesta tiene sandbox_init_point
const isSandboxPreference = !!response.sandbox_init_point;
```

**¿Qué hace `!!response.sandbox_init_point`?**
- Si `sandbox_init_point` existe → `true` (es sandbox)
- Si `sandbox_init_point` es `undefined` o `null` → `false` (es producción)

### Paso 4: Determina el Modo Final

```typescript
const isTestMode = forceTestMode || isSandboxPreference;
```

**Lógica:**
- Si `MERCADOPAGO_TEST_MODE=true` → `forceTestMode = true` → **Siempre modo prueba**
- Si `MERCADOPAGO_TEST_MODE=false` o no existe → `forceTestMode = false`
  - Entonces depende de `isSandboxPreference`:
    - Si Mercado Pago devolvió `sandbox_init_point` → `isTestMode = true` (sandbox)
    - Si Mercado Pago NO devolvió `sandbox_init_point` → `isTestMode = false` (producción)

---

## 📊 Ejemplos Prácticos

### Ejemplo 1: Token de Prueba + `MERCADOPAGO_TEST_MODE=false`

```typescript
// Configuración
MERCADOPAGO_ACCESS_TOKEN = "TEST-xxxxx"  // Token de prueba
MERCADOPAGO_TEST_MODE = "false"

// Proceso
1. Crea preferencia → Mercado Pago responde con sandbox_init_point
2. isSandboxPreference = true (porque existe sandbox_init_point)
3. forceTestMode = false (porque MERCADOPAGO_TEST_MODE=false)
4. isTestMode = false || true = true → MODO PRUEBA ✅
```

**Resultado:** Modo prueba (porque el token es de prueba, no por la variable)

---

### Ejemplo 2: Token de Producción + `MERCADOPAGO_TEST_MODE=false`

```typescript
// Configuración
MERCADOPAGO_ACCESS_TOKEN = "APP_USR-xxxxx"  // Token de producción
MERCADOPAGO_TEST_MODE = "false"

// Proceso
1. Crea preferencia → Mercado Pago responde SIN sandbox_init_point
2. isSandboxPreference = false (porque NO existe sandbox_init_point)
3. forceTestMode = false (porque MERCADOPAGO_TEST_MODE=false)
4. isTestMode = false || false = false → MODO PRODUCCIÓN ✅
```

**Resultado:** Modo producción (porque el token es de producción)

---

### Ejemplo 3: Token de Producción + `MERCADOPAGO_TEST_MODE=true`

```typescript
// Configuración
MERCADOPAGO_ACCESS_TOKEN = "APP_USR-xxxxx"  // Token de producción
MERCADOPAGO_TEST_MODE = "true"

// Proceso
1. Crea preferencia → Mercado Pago responde SIN sandbox_init_point
2. isSandboxPreference = false (porque NO existe sandbox_init_point)
3. forceTestMode = true (porque MERCADOPAGO_TEST_MODE=true)
4. isTestMode = true || false = true → MODO PRUEBA ⚠️ (forzado)
```

**Resultado:** Modo prueba (forzado, aunque el token sea de producción)

---

## 🎯 Por qué se llama "Detección Automática"

Se llama "automática" porque:

1. **No necesitas configurar nada manualmente** sobre el modo
2. **El código mira la respuesta real** de Mercado Pago
3. **Mercado Pago decide** qué devolver según el token que uses:
   - Token de prueba → Siempre devuelve `sandbox_init_point`
   - Token de producción → Nunca devuelve `sandbox_init_point`

---

## 💡 Analogía Simple

Imagina que vas a un restaurante:

- **Forzar modo prueba** (`MERCADOPAGO_TEST_MODE=true`):
  - Le dices al mesero: "Quiero el menú de prueba"
  - Te trae el menú de prueba, sin importar qué pediste

- **Detección automática** (`MERCADOPAGO_TEST_MODE=false` o no definida):
  - El mesero mira tu tarjeta de membresía
  - Si es tarjeta de prueba → Te trae menú de prueba
  - Si es tarjeta VIP → Te trae menú completo
  - El mesero decide según tu tarjeta

---

## ⚠️ Punto Clave

**La detección automática NO puede cambiar el modo que Mercado Pago decide.**

- Si usas token de prueba → Mercado Pago **siempre** crea preferencias en sandbox
- Si usas token de producción → Mercado Pago **siempre** crea preferencias en producción

**`MERCADOPAGO_TEST_MODE=false` NO convierte un token de prueba en producción.**

Solo afecta la **lógica interna** del código, pero Mercado Pago ya decidió el modo según el token.

---

## 📝 Resumen

| Token | `MERCADOPAGO_TEST_MODE` | Mercado Pago devuelve | Código detecta |
|-------|------------------------|----------------------|----------------|
| Prueba | `false` | `sandbox_init_point` | Modo prueba ✅ |
| Producción | `false` | Sin `sandbox_init_point` | Modo producción ✅ |
| Producción | `true` | Sin `sandbox_init_point` | Modo prueba ⚠️ (forzado) |

**"Detección automática" = El código mira la respuesta de Mercado Pago para saber el modo**

---

¡Espero que esto aclare cómo funciona! 🚀

