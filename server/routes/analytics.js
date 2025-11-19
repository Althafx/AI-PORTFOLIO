import express from 'express';
import Analytics from '../models/Analytics.js';
import Project from '../models/Project.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/analytics/overview
// @desc    Get analytics overview
// @access  Private
router.get('/overview', protect, async (req, res) => {
    try {
        const totalPageViews = await Analytics.countDocuments({ type: 'page_view' });
        const totalProjectViews = await Analytics.countDocuments({ type: 'project_view' });

        // Get views for last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentPageViews = await Analytics.countDocuments({
            type: 'page_view',
            timestamp: { $gte: sevenDaysAgo }
        });

        const recentProjectViews = await Analytics.countDocuments({
            type: 'project_view',
            timestamp: { $gte: sevenDaysAgo }
        });

        res.json({
            totalPageViews,
            totalProjectViews,
            recentPageViews,
            recentProjectViews
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/analytics/projects
// @desc    Get project-specific analytics
// @access  Private
router.get('/projects', protect, async (req, res) => {
    try {
        const projectStats = await Analytics.aggregate([
            { $match: { type: 'project_view' } },
            {
                $group: {
                    _id: '$projectId',
                    viewCount: { $sum: 1 }
                }
            },
            { $sort: { viewCount: -1 } }
        ]);

        // Populate project details
        const projectIds = projectStats.map(stat => stat._id);
        const projects = await Project.find({ _id: { $in: projectIds } });

        const projectAnalytics = projectStats.map(stat => {
            const project = projects.find(p => p._id.toString() === stat._id.toString());
            return {
                projectId: stat._id,
                projectTitle: project ? project.title : 'Unknown',
                viewCount: stat.viewCount
            };
        });

        res.json(projectAnalytics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/analytics/timeline
// @desc    Get views timeline (last 30 days)
// @access  Private
router.get('/timeline', protect, async (req, res) => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const timeline = await Analytics.aggregate([
            {
                $match: {
                    timestamp: { $gte: thirtyDaysAgo }
                }
            },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
                        type: '$type'
                    },
                    count: { $sum: 1 }
                }
            },
            { $sort: { '_id.date': 1 } }
        ]);

        res.json(timeline);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
