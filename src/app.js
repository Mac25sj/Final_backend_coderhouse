import express from "express";
import configureHandlebars from "./config/hbs.js";
import viewsRoutes from "./router/views.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); 

// Configuración de middlewares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); 

// Configuración de Handlebars, resto en config, hbs.js
configureHandlebars(app);

app.use("/", viewsRoutes); 

export default app; 