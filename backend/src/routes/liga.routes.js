import { Router } from "express";
import { LigaController } from "../controllers/liga.controller.js";

const router = Router();

router.get("/", LigaController.getAll);
router.get("/details", LigaController.getAllWithDetails);

router.get("/usuario/:usuario_id", LigaController.getByUsuario);

router.get("/:id", LigaController.getById);
router.get("/:id/details", LigaController.getByIdWithDetails);

router.post("/", LigaController.create);
router.put("/:id", LigaController.update);
router.delete("/:id", LigaController.delete);

export default router;
