import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import paymentRoutes from './routes/payment.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Routes
app.use('/api/payments', paymentRoutes);

// Health check básico (sin verificar DB)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Health check completo (verifica DB)
app.get('/health/db', async (req, res) => {
  try {
    if (!AppDataSource.isInitialized) {
      return res.status(503).json({ 
        status: 'error', 
        message: 'Database not initialized',
        database: 'disconnected'
      });
    }

    // Intentar una consulta simple para verificar la conexión
    await AppDataSource.query('SELECT 1');
    
    // Verificar si existe la tabla payments
    const tableExists = await AppDataSource.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'payments'
      );
    `);

    res.json({ 
      status: 'ok',
      database: 'connected',
      tableExists: tableExists[0].exists,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(503).json({ 
      status: 'error',
      database: 'disconnected',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Initialize database and start server
AppDataSource.initialize()
  .then(async () => {
    console.log('Database connected successfully');
    
    // Ejecutar migraciones pendientes (solo en producción o cuando se solicite)
    if (process.env.RUN_MIGRATIONS === 'true' || process.env.NODE_ENV === 'production') {
      try {
        console.log('Running pending migrations...');
        // Verificar que la conexión esté inicializada antes de ejecutar migraciones
        if (!AppDataSource.isInitialized) {
          console.log('⚠️ Database not initialized, skipping migrations');
        } else {
          const migrations = await AppDataSource.runMigrations();
          if (migrations.length > 0) {
            console.log(`✅ ${migrations.length} migration(s) executed successfully`);
            migrations.forEach((migration) => {
              console.log(`   - ${migration.name}`);
            });
          } else {
            console.log('✅ No pending migrations');
          }
        }
      } catch (migrationError: any) {
        // Si el error es porque ya está conectado, ignorarlo
        if (migrationError.message && migrationError.message.includes('already established')) {
          console.log('⚠️ Migrations already running or connection already established, skipping');
        } else {
          console.error('⚠️ Error running migrations (continuing anyway):', migrationError.message || migrationError);
        }
        // No salimos del proceso, el servidor puede seguir funcionando
      }
    }
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
    process.exit(1);
  });

