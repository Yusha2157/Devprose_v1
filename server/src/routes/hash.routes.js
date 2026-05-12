import { Router } from 'express';
import { generateHashOrUUID } from '../controllers/hash.controller.js';

const router = Router();

router.post('/', generateHashOrUUID);

export default router;
