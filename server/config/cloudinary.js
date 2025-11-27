import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server directory
dotenv.config({ path: path.join(__dirname, '../.env') });

// Validate Cloudinary credentials
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
    console.error('❌ CLOUDINARY ERROR: Missing credentials!');
    console.error('CLOUDINARY_CLOUD_NAME:', cloudName ? '✓ Set' : '✗ Missing');
    console.error('CLOUDINARY_API_KEY:', apiKey ? '✓ Set' : '✗ Missing');
    console.error('CLOUDINARY_API_SECRET:', apiSecret ? '✓ Set' : '✗ Missing');
} else {
    console.log('✅ Cloudinary credentials found');
    console.log('Cloud Name:', cloudName);
}

// Configure Cloudinary
cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
});

// Create storage for profile images
export const profileStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        console.log('📤 Uploading profile image:', file.originalname);
        return {
            folder: 'portfolio/profiles',
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
            transformation: [{ width: 500, height: 500, crop: 'limit' }],
            public_id: `profile_${Date.now()}`
        };
    }
});

// Create storage for project images
export const projectStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        console.log('📤 Uploading project image:', file.originalname);
        return {
            folder: 'portfolio/projects',
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
            transformation: [{ width: 1200, height: 800, crop: 'limit' }],
            public_id: `project_${Date.now()}`
        };
    }
});

export default cloudinary;
