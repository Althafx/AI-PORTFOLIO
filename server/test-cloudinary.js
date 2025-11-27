import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

console.log('Testing Cloudinary Configuration...\n');

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

console.log('Environment Variables:');
console.log('CLOUDINARY_CLOUD_NAME:', cloudName);
console.log('CLOUDINARY_API_KEY:', apiKey ? `${apiKey.substring(0, 4)}...` : 'Missing');
console.log('CLOUDINARY_API_SECRET:', apiSecret ? `${apiSecret.substring(0, 4)}...` : 'Missing');
console.log('');

// Configure Cloudinary
cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
});

// Test the connection
console.log('Testing Cloudinary connection...');

cloudinary.api.ping()
    .then(result => {
        console.log('✅ SUCCESS! Cloudinary connection works!');
        console.log('Response:', result);
    })
    .catch(error => {
        console.log('❌ FAILED! Cloudinary connection error:');
        console.log('Error:', error.message);
        console.log('');
        console.log('Common issues:');
        console.log('1. Cloud name is incorrect (check Cloudinary dashboard)');
        console.log('2. API key or secret is wrong');
        console.log('3. Cloudinary account is not active');
    });
