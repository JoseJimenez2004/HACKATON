import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

// Configurar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

// Ruta de prueba
app.get("/api/health", (req, res) => {
    res.json({ 
        status: "OK", 
        message: "Servidor de Remesas funcionando",
        timestamp: new Date().toISOString()
    });
});

app.get("/", (req, res) => {
    res.json({ 
        message: "Bienvenido a la API de Remesas",
        version: "1.0.0"
    });
});

app.listen(PORT, () => {
    console.log(` Servidor en http://localhost:${PORT}`);
});
