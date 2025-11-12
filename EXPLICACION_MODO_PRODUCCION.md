# 🔄 Cómo Funciona el Modo Producción vs Prueba

## 📋 Comportamiento Actual

El código detecta automáticamente el modo basándose en:

1. **Variable `MERCADOPAGO_TEST_MODE`:**
   - Si es `'true'` → Fuerza modo prueba
   - Si es `'false'` o no existe → **No fuerza nada**, detecta automáticamente

2. **Detección automática:**
   - Si Mercado Pago devuelve `sandbox_init_point` → Es modo prueba
   - Si NO devuelve `sandbox_init_point` → Es modo producción

## ⚠️ Importante

**`MERCADOPAGO_TEST_MODE=false` NO fuerza modo producción**, solo desactiva el forzado de modo prueba.

El modo real se determina por:
- **El Access Token que uses:**
  - Token de **PRUEBA** → Siempre crea preferencias en sandbox
  - Token de **PRODUCCIÓN** → Crea preferencias en producción

## ✅ Para Usar Modo Producción Real

### Opción 1: Usar Token de Producción (Recomendado)

1. Ve a: https://www.mercadopago.com.ar/developers/panel/credentials
2. Selecciona **"Credenciales de producción"** (NO "Credenciales de prueba")
3. Copia el **Access Token** de producción
4. En Railway, actualiza `MERCADOPAGO_ACCESS_TOKEN` con el token de producción
5. Opcionalmente, puedes poner `MERCADOPAGO_TEST_MODE=false` o simplemente no definirla

### Opción 2: Configurar Variables en Railway

```env
MERCADOPAGO_ACCESS_TOKEN=APP_USR-xxxxx-xxxxx  # Token de PRODUCCIÓN
MERCADOPAGO_TEST_MODE=false  # O simplemente no la definas
```

## 🔍 Cómo Verificar el Modo

Después de crear una preferencia, revisa los logs:

**Modo Prueba (Sandbox):**
```
✅ Tiene sandbox_init_point: SÍ ✅ (Es SANDBOX)
✅ Modo final: SANDBOX/PRUEBA ✅
```

**Modo Producción:**
```
⚠️ Tiene sandbox_init_point: NO ⚠️ (Es PRODUCCIÓN)
⚠️ Modo final: PRODUCCIÓN ⚠️
```

## 📝 Resumen

| Variable | Valor | Comportamiento |
|----------|-------|---------------|
| `MERCADOPAGO_TEST_MODE` | `true` | Fuerza modo prueba |
| `MERCADOPAGO_TEST_MODE` | `false` | No fuerza, detecta automáticamente |
| `MERCADOPAGO_TEST_MODE` | No definida | No fuerza, detecta automáticamente |
| Token usado | De prueba | Siempre sandbox |
| Token usado | De producción | Siempre producción |

## ⚠️ Advertencia

**Si usas un token de PRUEBA pero pones `MERCADOPAGO_TEST_MODE=false`:**
- El código no forzará modo prueba
- Pero Mercado Pago seguirá creando preferencias en sandbox (porque el token es de prueba)
- Verás: `sandbox_init_point` en la respuesta

**Para modo producción REAL:**
- Debes usar el **Access Token de PRODUCCIÓN**
- `MERCADOPAGO_TEST_MODE` puede ser `false` o no estar definida

---

¡El modo se determina principalmente por el token que uses! 🚀

