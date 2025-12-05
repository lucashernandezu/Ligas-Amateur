import { Router } from 'express';
import { DeporteController } from '../controllers/deporte.controller.js';

const router = Router();

router.get('/', DeporteController.getAll);
router.post('/', DeporteController.create);
router.delete('/:id', DeporteController.delete);
router.put('/:id', DeporteController.update);


export default router;