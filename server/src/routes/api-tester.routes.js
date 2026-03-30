import { Router } from 'express';
import { handleApiTest } from '../controllers/api-tester.controller.js';

const router = Router();

/**
 * POST /api/api-tester
 * Body: {
 *   url: string,
 *   method: string,
 *   headers?: object,
 *   body?: object
 * }
 */
router.post('/', handleApiTest);

export default router;