import { Router } from 'express';
import * as ctrl from '../controllers/labs.controller.js';
import { writeLimiter } from '../middleware/rateLimiter.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = Router();

router.get('/', ctrl.getLabs);
router.get('/:id', ctrl.getLab);
router.post('/', writeLimiter, requireAdmin, ctrl.createLab);
router.put('/:id', writeLimiter, requireAdmin, ctrl.updateLab);
router.delete('/:id', writeLimiter, requireAdmin, ctrl.deleteLab);

export default router;
