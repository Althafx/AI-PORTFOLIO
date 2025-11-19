import express from 'express';
import Skill from '../models/Skill.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/skills
// @desc    Get all skills
// @access  Public
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find().sort({ category: 1, order: 1 });
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/skills
// @desc    Create a new skill
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const skill = await Skill.create(req.body);
        res.status(201).json(skill);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/skills/:id
// @desc    Update a skill
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        const skill = await Skill.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }

        res.json(skill);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/skills/:id
// @desc    Delete a skill
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);

        if (!skill) {
            return res.status(404).json({ message: 'Skill not found' });
        }

        await skill.deleteOne();
        res.json({ message: 'Skill removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
