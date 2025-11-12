# 🔧 Solución: Error 502 en Railway

## ❌ Problema

El error 502 (Bad Gateway) significa que Railway no puede conectarse a tu aplicación. En tus logs veo:

```
start      │ npm run build      ⚠️ ESTO ESTÁ MAL
```

**Problema:** Railway está usando `npm run build` como comando de **start** en lugar de `npm start`.

El comando `build` solo compila TypeScript, pero **no inicia el servidor**. Por eso obtienes 502.

---

## ✅ Solución

### Opción 1: Actualizar railway.json (Recomendado)

Ya actualicé el archivo `backend/railway.json` con la configuración correcta:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

**Pasos:**
1. Haz commit y push de los cambios:
   ```bash
   git add backend/railway.json
   git commit -m "Fix Railway start command"
   git push
   ```
2. Railway detectará los cambios y hará un nuevo deploy automáticamente

---

### Opción 2: Configurar Manualmente en Railway UI

Si prefieres configurarlo desde la interfaz:

1. Ve a Railway → Tu servicio backend
2. Ve a **Settings**
3. Busca la sección **"Deploy"** o **"Start Command"**
4. Configura:
   - **Start Command:** `npm start`
   - **Build Command:** `npm install && npm run build` (o déjalo vacío, Railway lo detecta)

---

## 🔍 Verificar que Funciona

Después del redeploy, revisa los logs. Deberías ver:

```
Starting Container
> mercado-pago-backend@1.0.0 start
> node dist/index.js

Database connected successfully
Running pending migrations...
✅ No pending migrations
Server running on port 3001
```

**NO deberías ver:**
```
> tsc
> mercado-pago-backend@1.0.0 build
```

---

## 🧪 Probar el Health Check

Una vez que el servidor esté corriendo:

```bash
curl https://tu-backend.railway.app/health
```

Deberías recibir:
```json
{"status":"ok"}
```

---

## 🐛 Otros Problemas Comunes

### Si sigue dando 502 después de corregir el start command:

1. **Verifica que el build fue exitoso:**
   - Los logs deben mostrar: `found 0 vulnerabilities`
   - Debe haber compilado TypeScript sin errores

2. **Verifica que existe `dist/index.js`:**
   - El comando `npm start` ejecuta `node dist/index.js`
   - Si no existe, el servidor no puede iniciar

3. **Verifica las variables de entorno:**
   - Asegúrate de que `NODE_ENV=production` esté configurado
   - Verifica que las variables de PostgreSQL estén correctas

4. **Revisa los logs completos:**
   - Ve a Railway → Deployments → View Logs
   - Busca errores de conexión a la base de datos
   - Busca errores de TypeScript

---

## 📋 Checklist de Verificación

- [ ] `railway.json` tiene `"startCommand": "npm start"`
- [ ] Cambios commiteados y pusheados
- [ ] Nuevo deploy iniciado en Railway
- [ ] Logs muestran `Server running on port X`
- [ ] Health check responde: `{"status":"ok"}`
- [ ] No hay errores en los logs

---

## 💡 Explicación Técnica

**¿Por qué pasó esto?**

Nixpacks (el builder de Railway) a veces detecta incorrectamente el comando de start. Si ve un script `build` en `package.json`, puede asumir que ese es el comando para iniciar la aplicación.

**La diferencia:**
- `npm run build` → Compila TypeScript a JavaScript (crea `dist/`)
- `npm start` → Ejecuta el servidor (`node dist/index.js`)

**En producción necesitas ambos:**
1. **Build:** Compilar el código
2. **Start:** Ejecutar el servidor

---

## ✅ Después de Corregir

Una vez que funcione, deberías poder:

1. ✅ Acceder a `/health` → `{"status":"ok"}`
2. ✅ Acceder a `/health/db` → Ver estado de la base de datos
3. ✅ Crear preferencias de pago
4. ✅ Recibir webhooks de Mercado Pago

---

¡Con esto debería funcionar! 🚀

