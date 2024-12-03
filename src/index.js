// app.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"; //para poder hacer puts, y tal desde el cliente al servidor
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import photoRoutes from "./routes/photoRoutes.js";
import eventosGenerales from "./routes/eventosGenerales.Routes.js";
import participant from "./routes/participantsRoutes.js";
import { testConnection } from "./db.js";
import dotenv from "dotenv";
import { insertInitialUserData } from "./start_data.js";
import path from 'path'
import {fileURLToPath} from 'url';
dotenv.config();

const app = express();

// Configura el middleware CORS para que peuda recibir solicitudes de POST, PUT, DELETE, UPDATE, etc.
app.use(
  cors({
    credentials: true,
    origin: "https://aventuranatura-8e6f8.web.app",
  })
);

//header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());

// Middleware para analizar el cuerpo de las solicitudes con formato JSON
app.use(express.json());

// Middleware para analizar el cuerpo de las solicitudes con datos de formulario
app.use(express.urlencoded({ extended: true })); // Para analizar datos de formularios en el cuerpo de la solicitud

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename)

// Servir archivos estáticos desde la carpeta "uploads"
app.use("/uploads", express.static(path.join(__dirname,"uploads")));

await testConnection();
await insertInitialUserData();

// Configurar rutas
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/events", eventRoutes);
app.use("/photos", photoRoutes);
app.use("/general", eventosGenerales);
app.use("/participants", participant);

/* app.use('/test', testRoutes); */

// Iniciar el servidor
app.listen(process.env.PORT, () => {
  console.log("Servidor iniciado en el puerto 3001");
});
