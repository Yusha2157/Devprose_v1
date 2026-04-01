import { Router } from 'express';
import { formatJSON } from '../controllers/json.controller.js';

const router = Router();

/**
 * POST /api/json
 * Body: { json: string }
 * Returns: { success: true, data: string } or { success: false, error: string }
 */
router.post('/', formatJSON);

/**
 * POST /api/json/format
 * Alias route for clarity
 */
router.post('/format', formatJSON);

export default router;
