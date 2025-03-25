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

router.get('/:id', async (req, res) => {
    const{id} = req.params
    try {
        const studygroup = await StudyGroup.findById(id)
        res.status(200).json(studygroup)
    } catch (error) {
        console.error(error);
    }
    // try {
    //     const studygroup= await StudyGroup.findById().populate('studygroup','name','description', 'subject'); 

    //     if (!studygroup|| studygroup.length === 0) {
    //         return res.status(404).json({ message: 'No group found' });
    //     }

    //     return res.status(200).json(studygroup); 
    // } catch (error) {
    //     console.error('Error fetching group:', error);
    //     return res.status(500).json({ message: 'Server error', error: error.message });
    // }
});

// GET all groups

router.get('/', async (req, res) => {
  try {
    const studygroups = await StudyGroup.find()
    //   const studygroups = await StudyGroups.findById()       populate('studygroup','name','description', 'subject'); 
      if (!studygroups|| studygroups.length === 0) {
        return res.status(404).json({ message: 'No groups found' });
    }

    return res.status(200).json(studygroups); 
} catch (error) {
    console.error('Error fetching groups:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
}
});
// PATCH - Update a group
router.patch('/:id', async (req, res) => {

  try {
      const updatedStudyGroup = await StudyGroup.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedStudyGroup) {
          return res.status(404).json({ error: 'Group not found' });
      }
      res.json(updatedStudyGroup);
  } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
  }
});
// DELETE - Remove a group
router.delete('/:id', async (req, res) => {
  try {
      const deletedStudyGroup = await StudyGroup.findByIdAndDelete(req.params.id);
      if (!deletedStudyGroup) {
          return res.status(404).json({ error: 'Group not found' });
      }
      res.status(204).end();
  } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
  }
});






export default router;