import { Router } from 'express';
import { handleExplain } from '../controllers/ai.controller.js';

const router = Router();

/**
 * POST /api/ai/explain
 * Body: { code: string, language: string, mode: 'explain' | 'debug' | 'optimize' }
 */
router.post('/explain', handleExplain);

export default router;
 