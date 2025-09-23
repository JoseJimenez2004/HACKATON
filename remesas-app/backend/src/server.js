import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { testConnection } from './config/database.js';
import syncDatabase from './config/migrations.js';
import routes from './routes/index.js';

// Configurar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api', routes);

// Ruta de salud
app.get('/api/health', async (req, res) => {
    const dbStatus = await testConnection();
    res.json({ 
        status: 'OK', 
        database: dbStatus ? 'Connected' : 'Disconnected',
        timestamp: new Date().toISOString()
    });
});

// Ruta principal
app.get('/', (req, res) => {
    res.json({ 
        message: 'Bienvenido a la API de Finanzas para Todos',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            transactions: '/api/transactions'
        }
    });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false,
        message: 'Algo salió mal en el servidor' 
    });
});

// Ruta 404
app.use('*', (req, res) => {
    res.status(404).json({ 
        success: false,
        message: 'Endpoint no encontrado' 
    });
});

// Inicializar base de datos y servidor
const startServer = async () => {
    try {
        // Sincronizar base de datos
        await syncDatabase();
        
        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
            console.log(`📊 Entorno: ${process.env.NODE_ENV}`);
            console.log(`💾 Base de datos: ${process.env.DB_NAME}`);
        });
    } catch (error) {
        console.error('❌ Error iniciando servidor:', error);
        process.exit(1);
    }
};

startServer();