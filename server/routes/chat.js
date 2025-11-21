import express from 'express';
import { chatWithGroq } from '../services/groq.js';

const router = express.Router();

// @route   POST /api/chat
// @desc    Chat with AI assistant
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }

        const response = await chatWithGroq(message);

        res.json({ response });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ message: 'Failed to get AI response. Please try again.' });
    }
});

export default router;
