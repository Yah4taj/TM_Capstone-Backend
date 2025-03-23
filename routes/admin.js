import express from 'express';
import { protect } from '../middleware/authMiddleware.js'; // Protect middleware 
import { adminOnly } from '../middleware/adminMiddleware.js'; // Middleware to check for admin role

// Import controller functions for managing users, reports, etc.
import { manageUsers, viewReports, modifyData, manageMaterials } from '../controllers/adminController.js';
import { deactivateUser, reactivateUser } from '../controllers/adminController.js';

const router = express.Router();

// Route to register a new admin
router.post('/register', protect, adminOnly); // Only accessible by existing admins

// Admin-specific routes
router.get('/manageUsers', protect, adminOnly, manageUsers);
router.get('/viewReports', protect, adminOnly, viewReports);
router.get('/modifyData', protect, adminOnly, modifyData);
router.get('/manageMaterials', protect, adminOnly, manageMaterials);

// User account management routes
router.patch("/:id/deactivate", protect, adminOnly, deactivateUser);
router.patch("/:id/reactivate", protect, adminOnly, reactivateUser);

export default router;
