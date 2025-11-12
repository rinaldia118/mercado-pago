# 🚀 Inicio Rápido

## Paso 1: Configurar el Token de Mercado Pago

1. Ve a [Mercado Pago Developers](https://www.mercadopago.com.ar/developers/panel/credentials)
2. Inicia sesión y obtén tu **Access Token** (puedes usar el de prueba para desarrollo)
3. Edita el archivo `.env` en la raíz del proyecto y reemplaza `your_access_token_here` con tu token:

```bash
nano .env
# o
vim .env
```

O simplemente edita el archivo `.env` y cambia:
```
MERCADOPAGO_ACCESS_TOKEN=tu_token_real_aqui
```

## Paso 2: Ejecutar en Modo Desarrollo

Ejecuta este comando desde la raíz del proyecto:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

**Nota:** La primera vez puede tardar varios minutos mientras descarga las imágenes y construye los contenedores.

## Paso 3: Acceder a la Aplicación

Una vez que todos los servicios estén corriendo, abre tu navegador en:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **Health Check:** http://localhost:3001/health

## Comandos Útiles

### Ver los logs
```bash
docker-compose -f docker-compose.dev.yml logs -f
```

### Detener los servicios
```bash
docker-compose -f docker-compose.dev.yml down
```

### Detener y eliminar volúmenes (resetear BD)
```bash
docker-compose -f docker-compose.dev.yml down -v
```

### Ejecutar en modo producción
```bash
docker-compose up --build
```

## Solución de Problemas

### Si el backend no se conecta a la base de datos
Espera unos segundos más, PostgreSQL puede tardar en iniciar. Verifica los logs:
```bash
docker-compose -f docker-compose.dev.yml logs postgres
```

### Si el frontend no carga
Verifica que el puerto 3000 no esté en uso:
```bash
lsof -i :3000
```

### Si necesitas ver los logs de un servicio específico
```bash
docker-compose -f docker-compose.dev.yml logs backend
docker-compose -f docker-compose.dev.yml logs frontend
```

