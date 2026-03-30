import { Router } from 'express';
import { formatJSON } from '../controllers/json.controller.js';

const router = Router();

/**
 * POST /api/json
 * Body: { json: string }
 */
router.post('/', formatJSON);

export default router;
