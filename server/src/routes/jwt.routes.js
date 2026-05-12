import { Router } from 'express';
import { handleJWTRequest } from '../controllers/jwt.controller.js';

const router = Router();

/**
 * POST /api/jwt
 */
router.post('/', handleJWTRequest);

export default router;