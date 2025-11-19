import Analytics from '../models/Analytics.js';

// Middleware to track page views
export const trackPageView = async (req, res, next) => {
    try {
        // Don't track admin routes or API calls
        if (req.path.startsWith('/api/admin') || req.path.startsWith('/api/auth')) {
            return next();
        }

        const analytics = new Analytics({
            type: 'page_view',
            ipAddress: req.ip || req.connection.remoteAddress,
            userAgent: req.get('User-Agent')
        });

        await analytics.save();
    } catch (error) {
        console.error('Analytics tracking error:', error);
    }

    next();
};

// Function to track project views (called from route)
export const trackProjectView = async (projectId, req) => {
    try {
        const analytics = new Analytics({
            type: 'project_view',
            projectId,
            ipAddress: req.ip || req.connection.remoteAddress,
            userAgent: req.get('User-Agent')
        });

        await analytics.save();
    } catch (error) {
        console.error('Project view tracking error:', error);
    }
};
