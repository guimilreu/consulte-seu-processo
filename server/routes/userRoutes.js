import express from 'express';
import { getLawyers, createLawyer, updateLawyer, deleteLawyer } from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', authenticate, requireAdmin, getLawyers);
router.post('/', authenticate, requireAdmin, createLawyer);
router.put('/:id', authenticate, requireAdmin, updateLawyer);
router.delete('/:id', authenticate, requireAdmin, deleteLawyer);

export default router;

