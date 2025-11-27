import express from 'express';
import multer from 'multer';
import Profile from '../models/Profile.js';
import { protect } from '../middleware/auth.js';
import { profileStorage } from '../config/cloudinary.js';

const router = express.Router();

// Configure multer for profile image uploads with Cloudinary
const upload = multer({
    storage: profileStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
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
        console.log('📝 Profile upload request received');
        console.log('File uploaded:', req.file ? 'Yes' : 'No');
        if (req.file) {
            console.log('File details:', {
                originalname: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size,
                cloudinaryPath: req.file.path
            });
        }

        let profile = await Profile.findOne();

        const updateData = { ...req.body };

        // If a file was uploaded, add the Cloudinary URL
        if (req.file) {
            updateData.profileImage = req.file.path; // Cloudinary URL
            console.log('✅ Cloudinary URL:', req.file.path);
        }

        if (profile) {
            // Update existing profile
            profile = await Profile.findByIdAndUpdate(
                profile._id,
                updateData,
                { new: true, runValidators: true }
            );
            console.log('✅ Profile updated successfully');
        } else {
            // Create new profile
            profile = await Profile.create(updateData);
            console.log('✅ Profile created successfully');
        }

        res.json(profile);
    } catch (error) {
        console.error('❌ Profile upload error:', error);
        res.status(500).json({
            message: error.message,
            details: error.stack
        });
    }
});

export default router;
