import express from 'express';
import { generateToken, protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/auth/login
// @desc    Authenticate admin with hardcoded credentials
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate against hardcoded admin credentials
        // Hardcoded for production issue resolution
        const ADMIN_EMAIL = 'admin@portfolio.com';
        const ADMIN_PASSWORD = 'OFFICIAL0487';

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            // Generate a dummy user ID for token generation
            const adminUserId = 'admin-user-id';

            res.json({
                _id: adminUserId,
                username: 'Admin',
                email: ADMIN_EMAIL,
                token: generateToken(adminUserId)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/auth/verify
// @desc    Verify token and get user data
// @access  Private
router.get('/verify', protect, async (req, res) => {
    try {
        res.json({
            _id: req.user._id,
            username: req.user.username,
            email: req.user.email
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
