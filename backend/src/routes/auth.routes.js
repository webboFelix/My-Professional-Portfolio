import { Router } from 'express';
import { verifyAdmin } from '../controllers/auth.controller.js';

const router = Router();

router.get('/verify', verifyAdmin);

export default router;
