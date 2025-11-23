import express from 'express';
import multer from 'multer';
import path from 'path';
import Profile from '../models/Profile.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for profile image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});


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

// @route   PUT /api/profile/upload
// @desc    Update or create profile with image upload
// @access  Private
router.put('/upload', protect, upload.single('profileImage'), async (req, res) => {
    try {
        let profile = await Profile.findOne();

        const updateData = { ...req.body };

        // If a file was uploaded, add the image path
        if (req.file) {
            updateData.profileImage = `/uploads/${req.file.filename}`;
        }

        if (profile) {
            // Update existing profile
            profile = await Profile.findByIdAndUpdate(
                profile._id,
                updateData,
                { new: true, runValidators: true }
            );
        } else {
            // Create new profile
            profile = await Profile.create(updateData);
        }

        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
