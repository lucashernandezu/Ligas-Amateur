import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller.js";
import { verificarToken, soloAdmin } from "../middlewares/auth.middleware.js";
const router = Router();

router.get("/", verificarToken, soloAdmin, UsuarioController.getAll);
router.get("/:id", verificarToken, soloAdmin, UsuarioController.getById);
router.put("/:id", verificarToken, soloAdmin, UsuarioController.update);
router.delete("/:id", verificarToken, soloAdmin, UsuarioController.delete);
export default router;

