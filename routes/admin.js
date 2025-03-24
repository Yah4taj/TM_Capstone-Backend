import express from 'express';
import Admin from '../models/Admin.js';
import { protect } from '../middleware/authMiddleware.js'; // Protect middleware 
import { adminOnly } from '../middleware/adminMiddleware.js'; // Middleware to check for admin role

// Import controller functions for managing users, reports, etc.
import { manageUsers, viewReports, modifyData, manageMaterials } from '../controllers/adminController.js';

const router = express.Router();


// Admin-specific routes
router.get('/manageUsers', protect, adminOnly, manageUsers);
router.get('/viewReports', protect, adminOnly, viewReports);
router.get('/modifyData', protect, adminOnly, modifyData);
router.get('/manageMaterials', protect, adminOnly, manageMaterials);


// POST - Create a new admin
router.post('/', async (req, res) => {
    try {
        const admin = new Admin(req.body);
        await admin.save();
        res.status(201).json(admin);
    } catch (e) {
        console.error(e);
        res.status(400).json({ message: e.message });
    }
});
 //Get a specific Admin by name

 router.get('/name', async (req, res) => {
    try {
        const admin = await Admin.findByName(req.params.id);
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.json(user);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
});
// PATCH - Update a admin
router.patch('/:id', async (req, res) => {
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAdmin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.json(updatedAdmin);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
});
router.delete('/', async (req, res) => {
    try {
        const deleteAdmin = await Admin.findByIdAndDelete(req.params.id);
        if (!deletedAdmin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        res.status(204).end();
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
});

//======================= ADMIN ROLE- STUDY GROUPS ROUTES=============================

//Get all Study Groups 

router.get('/studygroups', async (req, res) => {
    try {
        const studygroups= await StudyGroups.find().populate('studygroups', 'name,description, subject'); 

        if (!studygroups|| studygroups.length === 0) {
            return res.status(404).json({ message: 'No groups found' });
        }

        return res.status(200).json(studygroups); 
    } catch (error) {
        console.error('Error fetching groups:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});


//Modify a study group(AdminOnly)

// router.patch('/',authMiddleware, adminMiddleware, modifyStudyGroup);
router.patch('/name', async (req, res) => {
        try {
            const updatedStudyGroup = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedStudyGroup) {
                return res.status(404).json({ error: 'Group not found' });
            }
            res.json(updatedStudyGroup);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: e.message });
        }
    });

// Delete a study group (Admin Only)

// router.delete('/name', authMiddleware, adminMiddleware, deleteStudyGroup);

router.delete('/name', protect,adminOnly); //Only accessible by existing admin

router.delete('/name', async (req, res) => {
    try {
        const deletedStudyGroup = await User.findByNameAndDelete(req.params.id);
        if (!deletedStudyGroup) {
            return res.status(404).json({ error: 'Study Group not found' });
        }
        res.status(204).end();
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
});


export default router;

