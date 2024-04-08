import express from 'express';
import { getUser, getDashboardStats } from '../controllers/general.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();
router.get('/user/:id', getUser);
router.get('/dashboard', verifyToken, getDashboardStats);

export default router;
