import express from "express";
import cors from "cors";
import deporteRoutes from './routes/deporte.routes.js'
import categoriaRoutes from "./routes/categoria.routes.js";
import ligaRoutes from "./routes/liga.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API de Ligas Amateur funcionando ✅");
});

app.use('/api/deportes', deporteRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/ligas", ligaRoutes);
export default app;
