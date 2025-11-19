import express from 'express';
import Profile from '../models/Profile.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/profile
// @desc    Get profile
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profile = await Profile.findOne();

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/profile
// @desc    Update or create profile
// @access  Private
router.put('/', protect, async (req, res) => {
    try {
        let profile = await Profile.findOne();

        if (profile) {
            // Update existing profile
            profile = await Profile.findByIdAndUpdate(
                profile._id,
                req.body,
                { new: true, runValidators: true }
            );
        } else {
            // Create new profile
            profile = await Profile.create(req.body);
        }

        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
