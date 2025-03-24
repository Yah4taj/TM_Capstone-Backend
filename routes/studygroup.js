// This restricts study groups creation to admins


import express from 'express';
// import { adminMiddleware } from '../middleware/adminMiddleware.js';
// import { authMiddleware } from '../middleware/authMiddleware.js';
import StudyGroup from '../models/StudyGroup.js';

const router = express.Router();

// Create a study group 
// router.post('/', authMiddleware, adminMiddleware, createStudyGroup);

// POST - Create a new Study Group
router.post('/', async (req, res) => {
    try {
        const studygroup = new StudyGroup(req.body);
        await studygroup.save();
        res.status(201).json(studygroup);
    } catch (e) {
        console.error(e);
        res.status(400).json({ message: e.message });
    }
});
//Get a study group

router.get('/', async (req, res) => {
    try {
        const studygroup= await StudyGroup.find().populate('studygroup', 'name,description, subject'); 

        if (!studygroup|| studygroup.length === 0) {
            return res.status(404).json({ message: 'No group found' });
        }

        return res.status(200).json(studygroup); 
    } catch (error) {
        console.error('Error fetching group:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});






export default router;