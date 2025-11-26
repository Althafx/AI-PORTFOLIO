import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import { trackPageView } from './middleware/analytics.js';

// Import routes
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import projectRoutes from './routes/projects.js';
import skillRoutes from './routes/skills.js';
import experienceRoutes from './routes/experience.js';
import analyticsRoutes from './routes/analytics.js';
import chatRoutes from './routes/chat.js';

// Load environment variables
dotenv.config();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
const allowedOrigins = process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(',')
    : ['http://localhost:5173'];

console.log('🌐 Allowed CORS origins:', allowedOrigins);

app.use(cors({
    origin: function (origin, callback) {
        console.log('🔍 CORS check - Request origin:', origin);

        // Allow requests with no origin (like mobile apps, curl, or Postman)
        if (!origin) {
            console.log('✅ CORS - Allowing request with no origin');
            return callback(null, true);
        }

        if (allowedOrigins.indexOf(origin) !== -1) {
            console.log('✅ CORS - Origin allowed:', origin);
            return callback(null, true);
        } else {
            console.log('❌ CORS - Origin blocked:', origin);
            console.log('   Allowed origins:', allowedOrigins);
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Analytics tracking middleware (for public routes)
app.use(trackPageView);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/chat', chatRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('\n🚀 ================================');
    console.log(`   Server running on port ${PORT}`);
    console.log('   ================================');
    console.log('📊 Environment:', process.env.NODE_ENV || 'development');
    console.log('🔗 MongoDB:', process.env.MONGODB_URI ? 'Connected' : 'Not configured');
    console.log('🔑 JWT Secret:', process.env.JWT_SECRET ? 'Set' : 'Not set');
    console.log('🤖 Groq API:', process.env.GROQ_API_KEY ? 'Configured' : 'Not configured');
    console.log('🌐 CORS Origins:', allowedOrigins.join(', '));
    console.log('================================\n');
});
