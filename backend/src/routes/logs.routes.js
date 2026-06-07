import { Router } from 'express';
import * as ctrl from '../controllers/logs.controller.js';
import { writeLimiter } from '../middleware/rateLimiter.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = Router();

router.get('/', ctrl.getLogs);
router.post('/', writeLimiter, requireAdmin, ctrl.appendLog);
router.post('/simulate', writeLimiter, requireAdmin, ctrl.streamSimulatedLog);

export default router;
