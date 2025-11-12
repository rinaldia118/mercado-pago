# 🧪 Guía para Modo Prueba (Sandbox) de Mercado Pago

## ⚠️ Error Común: "Una de las partes con la que intentás hacer el pago es de prueba"

Este error aparece cuando hay un **desajuste entre el entorno de prueba y producción**.

## ✅ Solución

### Si estás usando un **Token de Prueba** (Sandbox):

1. **Asegúrate de tener un Access Token de prueba:**
   - Ve a https://www.mercadopago.com.ar/developers/panel/credentials
   - Selecciona tu aplicación
   - Copia el **Access Token de prueba** (generalmente empieza con `TEST-` o contiene `test`/`sandbox`)
   - Configúralo en tu archivo `.env`:
     ```
     MERCADOPAGO_ACCESS_TOKEN=TEST-tu-token-de-prueba-aqui
     ```

2. **Crea una cuenta de prueba del comprador:**
   - En tu panel de desarrollador de Mercado Pago
   - Ve a la sección "Usuarios de prueba"
   - Crea un usuario de prueba (comprador)
   - Anota el email y contraseña

3. **Al hacer el pago:**
   - Cuando Mercado Pago te redirija al checkout
   - **Cierra sesión** si estás logueado con tu cuenta real
   - **Inicia sesión** con la cuenta de prueba del comprador que creaste
   - Usa las tarjetas de prueba de Mercado Pago

### Tarjetas de Prueba de Mercado Pago

**⚠️ IMPORTANTE:** Las tarjetas de prueba SOLO funcionan si estás logueado con una **cuenta de prueba del comprador**. Si no estás logueado o estás logueado con tu cuenta real, verás el error "No es posible continuar el pago con esta tarjeta".

Para pagos aprobados:
- **Visa:** `4509 9535 6623 3704`
- **Mastercard:** `5031 7557 3453 0604`
- **CVV:** `123`
- **Fecha de vencimiento:** Cualquier fecha futura (ej: `11/25` o `12/30`)
- **Nombre del titular:** `APRO`

Para pagos rechazados:
- **Visa:** `4013 5406 8274 6260`
- **Mastercard:** `5031 4332 1540 6351`
- **CVV:** `123`
- **Fecha de vencimiento:** Cualquier fecha futura
- **Nombre del titular:** `OTOR`

### ⚠️ Error: "No es posible continuar el pago con esta tarjeta"

Este error aparece cuando:
1. **No estás logueado con una cuenta de prueba del comprador** (más común)
2. Estás usando una tarjeta de prueba pero estás logueado con tu cuenta real
3. La cuenta de prueba del comprador no está correctamente configurada

**Solución:**
1. Ve a https://www.mercadopago.com.ar/developers/panel/test-users
2. Crea un usuario de prueba (comprador) si no tienes uno
3. Anota el email y contraseña
4. Cuando Mercado Pago te redirija al checkout:
   - **Cierra sesión** si estás logueado
   - **Inicia sesión** con la cuenta de prueba del comprador
   - Luego ingresa la tarjeta de prueba

## 🔍 Cómo Verificar que Estás en Modo Prueba

**Importante:** Los tokens de prueba de Mercado Pago NO siempre tienen "test" en el nombre. El sistema detecta automáticamente si estás en modo prueba verificando si la respuesta de Mercado Pago incluye `sandbox_init_point`.

### Verificación en los Logs

Después de crear una preferencia, verás en los logs del backend:

```
Modo de la preferencia detectado:
  - Tiene sandbox_init_point: SÍ ✅ (Es SANDBOX)
  - Modo final: SANDBOX/PRUEBA ✅
```

Si ves `NO ⚠️ (Es PRODUCCIÓN)`, significa que tu token es de producción, no de prueba.

### Forzar Modo Prueba

Si tu token de prueba no está siendo detectado correctamente, puedes forzar el modo prueba agregando al `.env`:

```env
MERCADOPAGO_TEST_MODE=true
```

Esto hará que el sistema siempre use `sandbox_init_point` cuando esté disponible.

## 📝 Checklist

Antes de probar un pago, verifica:

- [ ] El token en `.env` es un token de prueba (empieza con `TEST-` o contiene `test`/`sandbox`)
- [ ] Has creado una cuenta de prueba del comprador en el panel de desarrollador
- [ ] Estás usando la URL `sandbox_init_point` (el sistema lo hace automáticamente)
- [ ] Al hacer el pago, inicias sesión con la cuenta de prueba del comprador
- [ ] Usas una tarjeta de prueba de Mercado Pago

## 🚨 Problemas Comunes

### "Sigo viendo el error aunque hice todo lo anterior"

1. **Limpia las cookies del navegador** - Puede que tengas sesión guardada de tu cuenta real
2. **Usa una ventana de incógnito** - Para asegurarte de no tener sesiones guardadas
3. **Verifica el token** - Asegúrate de que el token en `.env` sea realmente de prueba
4. **Reinicia el backend** - Para que cargue el nuevo token

### "No sé si mi token es de prueba o producción"

Los tokens de prueba generalmente:
- Empiezan con `TEST-`
- Contienen la palabra `test` o `sandbox` en alguna parte
- Se obtienen desde la sección "Credenciales de prueba" en el panel de desarrollador

Los tokens de producción:
- Empiezan con `APP_USR-`
- Se obtienen desde la sección "Credenciales de producción"

## 📚 Recursos

- [Documentación de Mercado Pago - Usuarios de Prueba](https://www.mercadopago.com.ar/developers/es/docs/checkout-api/testing)
- [Panel de Desarrollador](https://www.mercadopago.com.ar/developers/panel)
- [Tarjetas de Prueba](https://www.mercadopago.com.ar/developers/es/docs/checkout-api/testing)

