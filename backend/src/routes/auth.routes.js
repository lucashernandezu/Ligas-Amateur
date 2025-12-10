import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller.js";

const router = Router();

router.post("/register", UsuarioController.register);
router.post("/login", UsuarioController.login);

export default router;
