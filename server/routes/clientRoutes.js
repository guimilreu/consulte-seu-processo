import express from 'express';
import { getClients, getClient, createClient, updateClient, deleteClient, getClientStats } from '../controllers/clientController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/stats', authenticate, requireAdmin, getClientStats);
router.get('/', authenticate, requireAdmin, getClients);
router.get('/:id', authenticate, requireAdmin, getClient);
router.post('/', authenticate, requireAdmin, createClient);
router.put('/:id', authenticate, requireAdmin, updateClient);
router.delete('/:id', authenticate, requireAdmin, deleteClient);

export default router;

