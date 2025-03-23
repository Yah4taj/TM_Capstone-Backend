import express from 'express';
import { createStudyGroup, deleteStudyGroup } from '../controllers/studyGroupController.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// 🔹 Create a study group (Admin Only)
router.post('/', authMiddleware, adminMiddleware, createStudyGroup);

// 🔹 Delete a study group (Admin Only)
router.delete('/:id', authMiddleware, adminMiddleware, deleteStudyGroup);

export default router;