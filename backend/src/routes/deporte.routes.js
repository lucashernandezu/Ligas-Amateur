import { Router } from 'express';
import { DeporteController } from '../controllers/deporte.controller.js';
import { verificarToken, soloAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', DeporteController.getAll);
router.get('/:id', DeporteController.getById);

router.post('/', verificarToken, soloAdmin, DeporteController.create);
router.put('/:id', verificarToken, soloAdmin, DeporteController.update);
router.delete('/:id', verificarToken, soloAdmin, DeporteController.delete);

export default router;
