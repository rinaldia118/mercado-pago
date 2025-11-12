# 🚀 Guía para Levantar el Proyecto Localmente

## Opción 1: Con Docker (Recomendado - Más Fácil) 🐳

### Requisitos Previos
- Docker instalado
- Docker Compose instalado

### Pasos

1. **Verificar que el archivo `.env` esté configurado**
   ```bash
   cat .env
   ```
   Asegúrate de que `MERCADOPAGO_ACCESS_TOKEN` tenga tu token real.

2. **Levantar todos los servicios**
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

   Esto levantará:
   - ✅ PostgreSQL (puerto 5432)
   - ✅ Backend (puerto 3001)
   - ✅ Frontend (puerto 3000)

3. **Acceder a la aplicación**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Health Check: http://localhost:3001/health

4. **Ver logs (en otra terminal)**
   ```bash
   docker-compose -f docker-compose.dev.yml logs -f
   ```

5. **Detener los servicios**
   ```bash
   docker-compose -f docker-compose.dev.yml down
   ```

---

## Opción 2: Sin Docker (Desarrollo Local) 💻

### Requisitos Previos
- Node.js (v16 o superior)
- npm o yarn
- PostgreSQL instalado y corriendo localmente

### Pasos

#### 1. Configurar PostgreSQL

Asegúrate de que PostgreSQL esté corriendo:
```bash
# Verificar si PostgreSQL está corriendo
sudo systemctl status postgresql

# Si no está corriendo, iniciarlo
sudo systemctl start postgresql
```

Crear la base de datos:
```bash
# Conectar a PostgreSQL
sudo -u postgres psql

# Crear la base de datos
CREATE DATABASE mercadopago;

# Salir
\q
```

#### 2. Configurar Backend

```bash
# Ir al directorio del backend
cd backend

# Instalar dependencias
npm install

# Crear archivo .env en backend/ (si no existe)
cat > .env << 'EOF'
PORT=3001
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=mercadopago
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001
MERCADOPAGO_ACCESS_TOKEN=tu_token_aqui
EOF

# Editar el .env y poner tu token real
nano .env

# Iniciar el backend
npm run dev
```

El backend debería estar corriendo en http://localhost:3001

#### 3. Configurar Frontend

En otra terminal:

```bash
# Ir al directorio del frontend
cd frontend

# Instalar dependencias
npm install

# Iniciar el frontend
npm start
```

El frontend debería abrirse automáticamente en http://localhost:3000

---

## 🔧 Solución de Problemas

### Error: Puerto 3000 o 3001 ya en uso

```bash
# Ver qué proceso está usando el puerto
sudo lsof -i :3000
sudo lsof -i :3001

# Matar el proceso (reemplaza PID con el número que aparece)
kill -9 PID
```

### Error: No se puede conectar a PostgreSQL

**Con Docker:**
```bash
# Ver logs de PostgreSQL
docker-compose -f docker-compose.dev.yml logs postgres

# Esperar unos segundos, PostgreSQL puede tardar en iniciar
```

**Sin Docker:**
```bash
# Verificar que PostgreSQL esté corriendo
sudo systemctl status postgresql

# Verificar conexión
psql -h localhost -U postgres -d mercadopago
```

### Error: Backend no inicia

```bash
# Verificar que el .env esté configurado
cd backend
cat .env

# Verificar que las dependencias estén instaladas
npm install

# Ver logs detallados
npm run dev
```

### Error: Frontend no se conecta al backend

1. Verificar que el backend esté corriendo en http://localhost:3001
2. Verificar la variable `REACT_APP_API_URL` en el `.env` de la raíz
3. Reiniciar el frontend después de cambiar variables de entorno

---

## 📝 Comandos Útiles

### Con Docker

```bash
# Ver logs de un servicio específico
docker-compose -f docker-compose.dev.yml logs backend
docker-compose -f docker-compose.dev.yml logs frontend
docker-compose -f docker-compose.dev.yml logs postgres

# Reiniciar un servicio específico
docker-compose -f docker-compose.dev.yml restart backend

# Ver contenedores corriendo
docker ps

# Detener y eliminar volúmenes (resetear BD)
docker-compose -f docker-compose.dev.yml down -v
```

### Sin Docker

```bash
# Backend
cd backend
npm run dev          # Desarrollo con hot-reload
npm run build        # Compilar TypeScript
npm start            # Producción

# Frontend
cd frontend
npm start            # Desarrollo
npm run build        # Build de producción
```

---

## ✅ Checklist de Verificación

Antes de empezar, verifica:

- [ ] Docker está instalado (si usas Opción 1)
- [ ] PostgreSQL está instalado y corriendo (si usas Opción 2)
- [ ] Node.js está instalado (si usas Opción 2)
- [ ] El archivo `.env` tiene tu `MERCADOPAGO_ACCESS_TOKEN` configurado
- [ ] Los puertos 3000, 3001 y 5432 están disponibles

---

## 🎯 Recomendación

**Para empezar rápido:** Usa la **Opción 1 (Docker)**. Es más fácil y no requiere configurar PostgreSQL manualmente.

**Para desarrollo activo:** Si vas a modificar mucho código, la **Opción 2 (sin Docker)** puede ser más rápida para ver cambios.

