import { Router } from 'express';
import * as ctrl from '../controllers/contact.controller.js';
import { contactLimiter } from '../middleware/contactLimiter.js';

const router = Router();

router.post('/', contactLimiter, ctrl.submitContact);

export default router;
