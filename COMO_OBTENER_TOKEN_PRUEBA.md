# 🔑 Cómo Obtener el Access Token de Prueba

## ⚠️ Problema Detectado

Tu token actual (`APP_USR-1370262753074184-...`) es un token de **PRODUCCIÓN**, no de prueba.

Por eso Mercado Pago crea la preferencia en modo producción y cuando intentas pagar con tarjetas de prueba o sin una cuenta de prueba, aparece el error:
> "Una de las partes con la que intentás hacer el pago es de prueba"

## ✅ Solución: Obtener el Token de Prueba

### Paso 1: Ir al Panel de Desarrollador

1. Ve a: https://www.mercadopago.com.ar/developers/panel/credentials
2. Inicia sesión con tu cuenta de Mercado Pago

### Paso 2: Seleccionar tu Aplicación

1. Si tienes una aplicación creada, selecciónala
2. Si no tienes una, crea una nueva aplicación

### Paso 3: Obtener el Access Token de Prueba

1. En la página de credenciales, busca la sección **"Credenciales de prueba"** (no "Credenciales de producción")
2. Copia el **Access Token** que aparece ahí
3. Los tokens de prueba generalmente:
   - Empiezan con `TEST-`
   - O tienen un formato diferente al de producción
   - Están claramente marcados como "de prueba" o "test"

### Paso 4: Actualizar el .env

1. Edita el archivo `.env` en la raíz del proyecto:
   ```bash
   nano .env
   ```

2. Reemplaza el valor de `MERCADOPAGO_ACCESS_TOKEN`:
   ```env
   MERCADOPAGO_ACCESS_TOKEN=TEST-tu-token-de-prueba-aqui
   ```

3. Guarda el archivo (Ctrl+X, luego Y, luego Enter)

### Paso 5: Reiniciar el Backend

Si usas Docker:
```bash
docker compose -f docker-compose.dev.yml restart backend
```

Si no usas Docker, reinicia el servidor backend.

## 🔍 Cómo Verificar que Funcionó

Después de cambiar el token, intenta crear una preferencia nuevamente. En los logs del backend deberías ver:

```
MERCADOPAGO_ACCESS_TOKEN: Definido (PRUEBA/SANDBOX ⚠️)
Modo de la preferencia: SANDBOX/PRUEBA ✅
```

Y en la respuesta de Mercado Pago deberías ver `sandbox_init_point` disponible.

## 📝 Notas Importantes

- **No confundas** "Credenciales de prueba" con "Credenciales de producción"
- El token de prueba es diferente al de producción
- Con el token de prueba, puedes usar tarjetas de prueba y cuentas de prueba
- El token de producción solo funciona con pagos reales y tarjetas reales

## 🆘 Si No Encuentras el Token de Prueba

1. Asegúrate de estar en la sección correcta del panel (Credenciales de prueba)
2. Si no ves la sección, puede que necesites crear una aplicación primero
3. Verifica que estés en el país correcto (Argentina en este caso)
4. Contacta al soporte de Mercado Pago si persiste el problema

