# 🔍 Cómo Verificar si el Token es de Producción o Prueba

## ⚠️ Problema Común

Los tokens de Mercado Pago **NO siempre** tienen prefijos diferentes:
- Algunos tokens de **prueba** también empiezan con `APP_USR-`
- Algunos tokens de **producción** también pueden tener formatos similares

**La única forma REAL de saberlo es probando** y viendo qué devuelve Mercado Pago.

---

## ✅ Forma Confiable de Verificar

### Método 1: Ver la Respuesta de Mercado Pago (Actual)

Tu código ya hace esto correctamente:

```typescript
const isSandboxPreference = !!response.sandbox_init_point;
```

**Si Mercado Pago devuelve `sandbox_init_point`:**
- ✅ Es token de **PRUEBA** (aunque empiece con `APP_USR-`)

**Si Mercado Pago NO devuelve `sandbox_init_point`:**
- ✅ Es token de **PRODUCCIÓN**

### Método 2: Verificar en el Panel de Mercado Pago

1. Ve a: https://www.mercadopago.com.ar/developers/panel/credentials
2. **IMPORTANTE:** Verifica en qué sección estás:
   - **"Credenciales de prueba"** → Token de prueba
   - **"Credenciales de producción"** → Token de producción
3. Asegúrate de copiar el token de la sección correcta

### Método 3: Probar con una Preferencia

Crea una preferencia y mira los logs:

**Token de PRUEBA:**
```
sandbox_init_point: https://sandbox.mercadopago.com.ar/...
Tiene sandbox_init_point: SÍ ✅ (Es SANDBOX)
```

**Token de PRODUCCIÓN:**
```
sandbox_init_point: undefined (o NO DISPONIBLE)
Tiene sandbox_init_point: NO ⚠️ (Es PRODUCCIÓN)
```

---

## 🔍 Tu Caso Específico

Según tus logs:
```
sandbox_init_point: https://sandbox.mercadopago.com.ar/...
Tiene sandbox_init_point: SÍ ✅ (Es SANDBOX)
```

**Esto significa que el token que estás usando es de PRUEBA**, aunque:
- Empiece con `APP_USR-`
- Lo hayas copiado de la sección de "producción"

---

## 🛠️ Soluciones

### Opción 1: Verificar en el Panel de Mercado Pago

1. Ve a: https://www.mercadopago.com.ar/developers/panel/credentials
2. **Asegúrate de estar en la sección "Credenciales de producción"**
3. Busca el **Access Token** (no el Public Key)
4. Copia el token completo
5. Pégalo en Railway → Variables → `MERCADOPAGO_ACCESS_TOKEN`
6. Haz redeploy

### Opción 2: Verificar el Estado de tu Cuenta

Algunas cuentas de Mercado Pago pueden estar en "modo prueba" incluso en producción:

1. Ve a tu panel de Mercado Pago
2. Verifica el estado de tu cuenta
3. Algunas cuentas nuevas o en proceso de verificación pueden estar limitadas

### Opción 3: Contactar a Mercado Pago

Si estás seguro de que copiaste el token de producción pero sigue devolviendo sandbox:

1. Contacta al soporte de Mercado Pago
2. Pregunta por qué tu token de producción devuelve `sandbox_init_point`
3. Puede ser un problema de configuración de cuenta

---

## 📋 Checklist de Verificación

- [ ] Estoy en la sección **"Credenciales de producción"** (no "prueba")
- [ ] Copié el **Access Token** (no el Public Key)
- [ ] El token está configurado en Railway → `MERCADOPAGO_ACCESS_TOKEN`
- [ ] Hice redeploy después de cambiar el token
- [ ] Los logs muestran: `Tiene sandbox_init_point: NO ⚠️ (Es PRODUCCIÓN)`

---

## 💡 Nota Importante

**El prefijo del token NO es confiable** para determinar si es de producción o prueba.

**La única forma confiable es:**
- Ver si Mercado Pago devuelve `sandbox_init_point` o no
- Verificar en qué sección del panel lo copiaste

---

## 🎯 Próximos Pasos

1. Ve al panel de Mercado Pago
2. Verifica que estés en "Credenciales de producción"
3. Copia el Access Token nuevamente
4. Actualízalo en Railway
5. Haz redeploy
6. Prueba creando una preferencia
7. Verifica los logs: debería decir `Tiene sandbox_init_point: NO ⚠️ (Es PRODUCCIÓN)`

---

¡Con esto deberías poder identificar correctamente el token! 🚀

