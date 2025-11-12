# Integración Mercado Pago

Aplicación completa con frontend en React y backend en Node.js con TypeScript, integrada con Mercado Pago.

## Estructura del Proyecto

```
mercado-pago/
├── backend/          # Backend en Node.js + TypeScript + Express
├── frontend/         # Frontend en React
├── docker-compose.yml        # Configuración para producción
└── docker-compose.dev.yml    # Configuración para desarrollo
```

## Requisitos Previos

- Docker y Docker Compose instalados
- Token de acceso de Mercado Pago (obtener desde [Mercado Pago Developers](https://www.mercadopago.com.ar/developers/panel/credentials))

## Configuración

1. Clona el repositorio (si aplica) o asegúrate de tener todos los archivos.

2. Crea un archivo `.env` en la raíz del proyecto con tu token de Mercado Pago:

```env
MERCADOPAGO_ACCESS_TOKEN=tu_token_aqui
```

3. Para desarrollo, también puedes crear un archivo `.env` en `backend/` con las siguientes variables (opcional):

```env
PORT=3001
NODE_ENV=development
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=mercadopago
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001
MERCADOPAGO_ACCESS_TOKEN=tu_token_aqui
```

## Uso

### Modo Desarrollo

Para levantar el proyecto en modo desarrollo con hot-reload:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

Esto levantará:
- PostgreSQL en el puerto 5432
- Backend en el puerto 3001 (con hot-reload)
- Frontend en el puerto 3000 (con hot-reload)

### Modo Producción

Para levantar el proyecto en modo producción:

```bash
docker-compose up --build
```

Esto levantará:
- PostgreSQL en el puerto 5432
- Backend en el puerto 3001
- Frontend en el puerto 3000 (servido por Nginx)

### Detener los servicios

```bash
# Desarrollo
docker-compose -f docker-compose.dev.yml down

# Producción
docker-compose down
```

### Limpiar volúmenes (eliminar datos de la base de datos)

```bash
# Desarrollo
docker-compose -f docker-compose.dev.yml down -v

# Producción
docker-compose down -v
```

## Endpoints del Backend

- `GET /health` - Health check
- `POST /api/payments/create-preference` - Crea una preferencia de pago
- `POST /api/payments/webhook` - Webhook para recibir notificaciones de Mercado Pago

## Frontend

El frontend tiene una página inicial simple con un botón para iniciar la compra. Al hacer clic, se crea una preferencia de pago y se redirige al usuario a Mercado Pago.

## Notas

- En desarrollo, el frontend usa el proxy configurado en `package.json` para comunicarse con el backend.
- En producción, Nginx actúa como proxy reverso para el backend.
- La base de datos se sincroniza automáticamente en desarrollo (TypeORM synchronize).
- En producción, considera desactivar `synchronize` y usar migraciones.

## Desarrollo Local (sin Docker)

Si prefieres desarrollar sin Docker:

### Backend

```bash
cd backend
npm install
# Configura las variables de entorno en .env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

Asegúrate de tener PostgreSQL corriendo localmente y configurado correctamente.

