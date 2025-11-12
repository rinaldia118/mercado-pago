# 🔧 Solución: "No es posible continuar el pago con esta tarjeta"

## ⚠️ Problema

Cuando intentas usar una tarjeta de prueba de Mercado Pago (ej: `4509 9535 6623 3704`), aparece el error:
> "No es posible continuar el pago con esta tarjeta"

## ✅ Solución Paso a Paso

### Paso 1: Crear Usuario de Prueba del Comprador

1. Ve a: https://www.mercadopago.com.ar/developers/panel/test-users
2. Haz clic en "Crear usuario de prueba"
3. Selecciona el tipo: **"Comprador"** (Buyer)
4. Completa los datos:
   - Email (puede ser ficticio, ej: `test_buyer@test.com`)
   - Nombre
   - Apellido
   - Documento (puede ser ficticio)
5. Guarda el **email** y **contraseña** que te da Mercado Pago

### Paso 2: Usar la Cuenta de Prueba al Pagar

1. Cuando hagas clic en "Iniciar Compra" en tu aplicación
2. Serás redirigido a Mercado Pago (sandbox)
3. **IMPORTANTE:** En la página de Mercado Pago:
   - Si estás logueado con tu cuenta real, **cierra sesión**
   - Haz clic en "Iniciar sesión" o "Ingresar"
   - Inicia sesión con el **email y contraseña de la cuenta de prueba del comprador** que creaste
4. Una vez logueado con la cuenta de prueba, ingresa la tarjeta de prueba:
   - **Visa:** `4509 9535 6623 3704`
   - **CVV:** `123`
   - **Fecha:** Cualquier fecha futura (ej: `11/25`)
   - **Nombre:** `APRO`

### Paso 3: Verificar que Funcionó

Si todo está correcto:
- ✅ Podrás ingresar la tarjeta sin problemas
- ✅ El pago se procesará (aprobado o rechazado según la tarjeta)
- ✅ Serás redirigido a `/success`, `/failure` o `/pending` según el resultado

## 🚨 Problemas Comunes

### "Sigo viendo el error después de iniciar sesión con cuenta de prueba"

1. **Verifica que la cuenta sea de tipo "Comprador"** (no "Vendedor")
2. **Limpia las cookies** del navegador o usa modo incógnito
3. **Asegúrate de estar en sandbox.mercadopago.com.ar** (no www.mercadopago.com.ar)
4. **Verifica que el token sea de prueba** (revisa los logs del backend)

### "No puedo crear un usuario de prueba"

1. Asegúrate de estar en el panel de desarrollador correcto
2. Verifica que tu aplicación esté creada
3. Contacta al soporte de Mercado Pago si persiste

### "La tarjeta no se acepta aunque estoy logueado con cuenta de prueba"

1. Verifica que estés usando la tarjeta correcta:
   - Para aprobado: `4509 9535 6623 3704` (Visa) o `5031 7557 3453 0604` (Mastercard)
   - CVV: `123`
   - Fecha: Futura (ej: `11/25`)
2. Asegúrate de que el CVV y la fecha sean correctos
3. Intenta con otra tarjeta de prueba

## 📝 Checklist Rápido

Antes de probar el pago, verifica:

- [ ] Tienes una cuenta de prueba del comprador creada
- [ ] Tienes el email y contraseña de la cuenta de prueba
- [ ] Estás en la URL de sandbox (el sistema lo hace automáticamente)
- [ ] Cerraste sesión de tu cuenta real (si estabas logueado)
- [ ] Iniciaste sesión con la cuenta de prueba del comprador
- [ ] Estás usando una tarjeta de prueba correcta
- [ ] El CVV es `123`
- [ ] La fecha de vencimiento es futura

## 🔗 Enlaces Útiles

- [Crear Usuarios de Prueba](https://www.mercadopago.com.ar/developers/panel/test-users)
- [Documentación de Testing](https://www.mercadopago.com.ar/developers/es/docs/checkout-api/testing)
- [Tarjetas de Prueba](https://www.mercadopago.com.ar/developers/es/docs/checkout-api/testing)

