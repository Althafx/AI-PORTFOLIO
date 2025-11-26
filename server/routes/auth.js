import express from 'express';
import { generateToken, protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/auth/login
// @desc    Authenticate admin with hardcoded credentials
// @access  Public
router.post('/login', async (req, res) => {
    try {
        console.log('🔐 Login attempt received');
        console.log('📍 Request origin:', req.headers.origin);
        console.log('📦 Request body exists:', !!req.body);

        const { email, password } = req.body;

        // Validate request body
        if (!email || !password) {
            console.log('❌ Missing credentials in request body');
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Trim whitespace from credentials
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        console.log('📧 Email received:', trimmedEmail);
        console.log('🔑 Password length:', trimmedPassword.length);

        // Validate against hardcoded admin credentials
        // Hardcoded for production issue resolution
        const ADMIN_EMAIL = 'admin@portfolio.com';
        const ADMIN_PASSWORD = 'OFFICIAL0487';

        console.log('🔍 Comparing credentials...');
        console.log('   Email match:', trimmedEmail === ADMIN_EMAIL);
        console.log('   Password match:', trimmedPassword === ADMIN_PASSWORD);

        if (trimmedEmail === ADMIN_EMAIL && trimmedPassword === ADMIN_PASSWORD) {
            console.log('✅ Authentication successful');

            // Generate a dummy user ID for token generation
            const adminUserId = 'admin-user-id';

            res.json({
                _id: adminUserId,
                username: 'Admin',
                email: ADMIN_EMAIL,
                token: generateToken(adminUserId)
            });
        } else {
            console.log('❌ Authentication failed - Invalid credentials');
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('💥 Login error:', error);
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
