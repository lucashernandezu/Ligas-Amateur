import { Router } from "express";
import { CategoriaController } from "../controllers/categoria.controller.js";
import { verificarToken, soloAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", CategoriaController.getAll);
router.get("/:id", CategoriaController.getById);

router.post("/", verificarToken, soloAdmin, CategoriaController.create);
router.put("/:id", verificarToken, soloAdmin, CategoriaController.update);
router.delete("/:id", verificarToken, soloAdmin, CategoriaController.delete);

export default router;
