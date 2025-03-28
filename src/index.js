import app from "./app.js";
import { createServer } from "http";
import { initWebSocket } from "./websockets/websocket.js";
import ProductManager from "./managers/ProductManager.js";
import connectDB from "./config/MongoDB.js";
import detectPort from "detect-port";
import dotenv from "dotenv";
dotenv.config();

// Validar variables de entorno
if (!process.env.MONGO_URI) {
    console.error("Error: La variable MONGO_URI no está definida.");
    process.exit(1);
}

// Inicializar la conexión con MongoDB
connectDB();

// Detectar un puerto disponible
detectPort(8080).then((PORT) => {
    const httpServer = createServer(app);
    const productManager = new ProductManager();

    // Inicializar WebSocket con manejo de errores
    try {
        initWebSocket(httpServer, productManager);
    } catch (error) {
        console.error("Error inicializando WebSocket:", error);
        process.exit(1); // Salir si falla la inicialización
    }

    // Iniciar el servidor en el puerto detectado
    httpServer.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    }).on("error", (error) => {
        if (error.code === "EADDRINUSE") {
            console.error(`El puerto ${PORT} ya está en uso. Intenta otro puerto.`);
        } else {
            console.error("Error al iniciar el servidor:", error);
        }
    });
}).catch((err) => {
    console.error("Error detectando el puerto:", err);
    process.exit(1); // Salir si no puede detectar un puerto
});