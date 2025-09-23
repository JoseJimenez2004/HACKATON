import express from 'express';
import { createTransaction, getTransactions } from '../controllers/transactionController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, createTransaction);
router.get('/', authenticateToken, getTransactions);

export default router;