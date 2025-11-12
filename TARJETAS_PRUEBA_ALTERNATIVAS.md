# 💳 Tarjetas de Prueba Alternativas de Mercado Pago

Si la tarjeta `4509 9535 6623 3704` no funciona, prueba con estas alternativas:

## ✅ Tarjetas para Pagos Aprobados

### Visa (Argentina)
- **Número:** `4509 9535 6623 3704`
- **CVV:** `123`
- **Vencimiento:** Cualquier fecha futura (ej: `11/25`)
- **Nombre:** `APRO`

### Mastercard (Argentina)
- **Número:** `5031 7557 3453 0604`
- **CVV:** `123`
- **Vencimiento:** Cualquier fecha futura (ej: `11/25`)
- **Nombre:** `APRO`

### Visa Alternativa
- **Número:** `4509 9535 6623 3704`
- **CVV:** `123`
- **Vencimiento:** `11/25`
- **Nombre:** `TEST USER`

### Mastercard Alternativa
- **Número:** `5031 4332 1540 6351`
- **CVV:** `123`
- **Vencimiento:** `11/25`
- **Nombre:** `APRO`

## ❌ Tarjetas para Pagos Rechazados (Para Testing)

### Visa Rechazada
- **Número:** `4013 5406 8274 6260`
- **CVV:** `123`
- **Vencimiento:** Cualquier fecha futura
- **Nombre:** `OTOR`

### Mastercard Rechazada
- **Número:** `5031 4332 1540 6351`
- **CVV:** `123`
- **Vencimiento:** Cualquier fecha futura
- **Nombre:** `OTOR`

## 🔍 Verificaciones Adicionales

### 1. Formato del Número de Tarjeta

Puedes ingresar el número:
- **Con espacios:** `4509 9535 6623 3704`
- **Sin espacios:** `4509953566233704`
- Ambos formatos deberían funcionar

### 2. Fecha de Vencimiento

- **Formato:** `MM/AA` (mes/año)
- **Ejemplos válidos:** `11/25`, `12/30`, `01/26`
- **Debe ser futura:** No uses fechas pasadas

### 3. CVV

- **Siempre:** `123` para tarjetas de prueba
- **3 dígitos:** No uses más ni menos

### 4. Nombre del Titular

Puedes probar con:
- `APRO` (todo mayúsculas)
- `Apro` (primera mayúscula)
- `TEST USER`
- `Test User`

## 🚨 Si Ninguna Tarjeta Funciona

### Verifica:

1. **La cuenta de prueba del comprador está activa:**
   - Ve a https://www.mercadopago.com.ar/developers/panel/test-users
   - Verifica que el usuario esté activo
   - Si no, créalo nuevamente

2. **Estás en sandbox:**
   - La URL debe ser `sandbox.mercadopago.com.ar`
   - No `www.mercadopago.com.ar`

3. **Estás logueado con la cuenta de prueba:**
   - Verifica en la esquina superior derecha
   - Debe mostrar el email de la cuenta de prueba
   - No tu email real

4. **Limpia cookies y caché:**
   - Usa modo incógnito
   - O limpia las cookies del navegador

5. **Intenta con otro navegador:**
   - Chrome
   - Firefox
   - Edge

## 📚 Documentación Oficial

- [Tarjetas de Prueba - Mercado Pago](https://www.mercadopago.com.ar/developers/es/docs/checkout-api/testing)
- [Usuarios de Prueba](https://www.mercadopago.com.ar/developers/panel/test-users)

