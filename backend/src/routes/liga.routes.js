import { Router } from "express";
import { LigaController } from "../controllers/liga.controller.js";

const router = Router();

router.get("/", LigaController.getAll);
router.post("/", LigaController.create);
router.put("/:id", LigaController.update);
router.delete("/:id", LigaController.delete);

export default router;
