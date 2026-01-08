import express from "express";
import cors from "cors";
import deporteRoutes from './routes/deporte.routes.js';
import categoriaRoutes from "./routes/categoria.routes.js";
import ligaRoutes from "./routes/liga.routes.js";
import authRoutes from "./routes/auth.routes.js";           
import usuarioRoutes from "./routes/usuario.routes.js";     
import { notFound, errorHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ 
    message: "API de Ligas Amateur funcionando ",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",              
      usuarios: "/api/usuarios",      
      deportes: "/api/deportes",
      categorias: "/api/categorias",
      ligas: "/api/ligas"
    }
  });
});

app.use('/api/auth', authRoutes);           
app.use('/api/usuarios', usuarioRoutes);    
app.use('/api/deportes', deporteRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/ligas", ligaRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
