import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import app from "./src/app.js";

const PORT = process.env.PORT || 4000;

createServer(app).listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
