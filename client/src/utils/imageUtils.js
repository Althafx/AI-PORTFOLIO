import { API_URL } from '../config';

/**
 * Get the full image URL
 * - If the URL starts with 'http', it's already a full URL (Cloudinary)
 * - Otherwise, prepend the API_URL to make it a full backend URL
 */
export const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    // If it's already a full URL (Cloudinary), return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }

    // Otherwise, construct full backend URL
    return `${API_URL}${imagePath}`;
};
