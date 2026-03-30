import { Router } from 'express';
import { testRegex } from '../controllers/regex.controller.js';

const router = Router();

/**
 * POST /api/regex
 * Body: { pattern: string, testString: string, flags: string }
 */
router.post('/', testRegex);

export default router;
