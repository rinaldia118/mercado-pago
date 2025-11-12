# 🔧 Solución: Railway Detecta Dockerfile Automáticamente

## Problema

Railway detecta automáticamente el `Dockerfile` y lo usa para el build, incluso si quieres usar Nixpacks (sin Docker).

## ✅ Soluciones (Elige una)

### Solución 1: Archivo railway.json (Ya Creado) ⭐ Recomendada

Ya creamos un archivo `railway.json` en la carpeta `backend/` que fuerza el uso de Nixpacks:

**Importante:** Como configuraste Root Directory como `backend`, Railway busca el `railway.json` en ese directorio, no en la raíz.

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  }
}
```

**Pasos:**
1. Asegúrate de que el archivo `railway.json` esté en la carpeta `backend/`
2. Haz commit y push:
   ```bash
   git add backend/railway.json
   git commit -m "Add railway.json to force Nixpacks"
   git push
   ```
3. En Railway, haz un nuevo deploy

### Solución 2: Renombrar Dockerfile

Renombra el Dockerfile para que Railway no lo detecte:

```bash
mv backend/Dockerfile backend/Dockerfile.backup
```

Luego haz commit:
```bash
git add backend/Dockerfile.backup
git rm backend/Dockerfile
git commit -m "Rename Dockerfile to use Nixpacks in Railway"
git push
```

### Solución 3: Configurar en Railway UI

1. Ve a tu proyecto en Railway
2. Selecciona el servicio backend
3. Ve a **Settings** → **Build**
4. En **Builder**, selecciona **"Nixpacks"** en lugar de **"Dockerfile"**
5. Guarda los cambios
6. Haz un nuevo deploy

### Solución 4: Mover Dockerfile fuera del Root Directory

Si configuraste Root Directory como `backend`, Railway solo busca Dockerfile en ese directorio. Puedes moverlo:

```bash
mv backend/Dockerfile ./Dockerfile.backup
```

## 🎯 Verificar que Funciona

Después de aplicar una solución:

1. Ve a Railway → Deployments
2. Haz clic en el último deploy
3. En los logs, deberías ver:
   ```
   Using Nixpacks builder
   ```
   En lugar de:
   ```
   Using Dockerfile
   ```

## 📝 Nota

El archivo `railway.json` tiene prioridad sobre el Dockerfile, así que la **Solución 1** debería funcionar automáticamente después de hacer push.

**Ubicación del archivo:**
- Si Root Directory = `backend` → `backend/railway.json` ✅ (tu caso)
- Si Root Directory = raíz → `railway.json` en la raíz

