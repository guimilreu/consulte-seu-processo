import express from 'express';
import { login, setupPassword, logout, getMe } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/setup-password', setupPassword);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getMe);

export default router;

