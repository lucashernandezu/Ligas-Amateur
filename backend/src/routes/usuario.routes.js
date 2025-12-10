import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller.js";

const router = Router();

router.get("/", UsuarioController.getAll);
router.get("/:id", UsuarioController.getById);
router.put("/:id", UsuarioController.update);
router.delete("/:id", UsuarioController.delete);

export default router;

