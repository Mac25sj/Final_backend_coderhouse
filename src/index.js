import express from "express";
import configureHandlebars from "./config/hbs.js";
import mongoose from "mongoose";
import { createServer } from "http";
import { initWebSocket } from "./websockets/websocket.js";
import ProductManager from "./managers/ProductManager.js";
import __dirname from "./utils.js";
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = 8080;
const productManager = new ProductManager();

// Configuración de middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//Mongo Db and Mongoose (ODM)
// MONGO_URI=mongodb+srv://mac25sj:Coderhouse_1234_Backend@db.ku4ub.mongodb.net/db?retryWrites=true&w=majority&appName=db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo DB se ha conectado correctamente");
  })
  .catch((err) => console.error(err));


// Configuración de Handlebars simple (resto en config)
configureHandlebars(app); 

// Rutas
app.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { title: "Lista de Productos", products });
});

app.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", { title: "Productos en Tiempo Real" });
});


const httpServer = createServer(app);

// Inicializar WebSocket
initWebSocket(httpServer, productManager); 

// Iniciar el servidor con mensaje directo al puerto
httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});