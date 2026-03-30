import { Router } from 'express';
import { testAPI } from '../controllers/api-tester.controller.js';

const router = Router();

/**
 * POST /api/api-tester
 * Body: { url: string, method: string, headers: object, body: string }
 */
router.post('/', testAPI);

export default router;
