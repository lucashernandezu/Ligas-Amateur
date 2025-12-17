import { Router } from "express";
import { LigaController } from "../controllers/liga.controller.js";
import { verificarToken, soloAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", LigaController.getAll);
router.get("/details", LigaController.getAllWithDetails);
router.get("/usuario/:usuario_id", LigaController.getByUsuario);
router.get("/:id", LigaController.getById);
router.get("/:id/details", LigaController.getByIdWithDetails);

router.post("/", verificarToken, soloAdmin, LigaController.create);
router.put("/:id", verificarToken, soloAdmin, LigaController.update);
router.delete("/:id", verificarToken, soloAdmin, LigaController.delete);

export default router;
