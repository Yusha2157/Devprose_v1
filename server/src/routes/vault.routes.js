import { Router } from 'express';
import { getSnippets, createSnippet, deleteSnippet } from '../controllers/vault.controller.js';

const router = Router();

router.get('/', getSnippets);
router.post('/', createSnippet);
router.delete('/:id', deleteSnippet);

export default router;
