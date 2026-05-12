import { Router } from 'express';
import { explainCron } from '../controllers/cron.controller.js';

const router = Router();

router.post('/explain', explainCron);

export default router;
