import { Router } from 'express';
import { handleJWT } from '../controllers/jwt.controller.js';

const router = Router();

/**
 * POST /api/jwt
 * Body: { token: string, action: 'encode' | 'decode' }
 */
router.post('/', handleJWT);

export default router;
