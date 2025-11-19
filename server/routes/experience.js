import express from 'express';
import Experience from '../models/Experience.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/experience
// @desc    Get all experience entries
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { type } = req.query;
        const filter = type ? { type } : {};

        const experiences = await Experience.find(filter).sort({ startDate: -1, order: 1 });
        res.json(experiences);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/experience
// @desc    Create a new experience entry
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const experience = await Experience.create(req.body);
        res.status(201).json(experience);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/experience/:id
// @desc    Update an experience entry
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        const experience = await Experience.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        res.json(experience);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/experience/:id
// @desc    Delete an experience entry
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);

        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        await experience.deleteOne();
        res.json({ message: 'Experience removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
