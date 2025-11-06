import express from 'express';
import {
  getAllProcesses,
  getUserProcesses,
  getProcess,
  searchProcesses,
  createProcess,
  updateProcess,
  deleteProcess,
  addTimeline,
  updateTimeline,
  deleteTimeline,
  getStats,
} from '../controllers/processController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/stats', authenticate, requireAdmin, getStats);
router.get('/search', authenticate, requireAdmin, searchProcesses);
router.get('/user', authenticate, getUserProcesses);
router.get('/:id', authenticate, getProcess);
router.get('/', authenticate, requireAdmin, getAllProcesses);
router.post('/', authenticate, requireAdmin, createProcess);
router.put('/:id', authenticate, requireAdmin, updateProcess);
router.delete('/:id', authenticate, requireAdmin, deleteProcess);
router.post('/:id/timeline', authenticate, requireAdmin, addTimeline);
router.put('/:id/timeline/:timelineId', authenticate, requireAdmin, updateTimeline);
router.delete('/:id/timeline/:timelineId', authenticate, requireAdmin, deleteTimeline);

export default router;

