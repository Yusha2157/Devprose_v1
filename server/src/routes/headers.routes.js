import { Router } from 'express';
import { inspectHeaders } from '../controllers/headers.controller.js';

const router = Router();

/**
 * POST /api/headers
 * Body: { url: string }
 */
router.post('/', inspectHeaders);

export default router;
