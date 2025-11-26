import express from 'express';
import multer from 'multer';
import Project from '../models/Project.js';
import { protect } from '../middleware/auth.js';
import { trackProjectView } from '../middleware/analytics.js';
import { projectStorage } from '../config/cloudinary.js';

const router = express.Router();

// Configure multer for file uploads with Cloudinary
const upload = multer({
    storage: projectStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().sort({ order: 1, createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/projects/:id
// @desc    Get single project and track view
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Increment view count
        project.viewCount += 1;
        await project.save();

        // Track in analytics
        await trackProjectView(project._id, req);

        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/projects
// @desc    Create a new project
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/projects/upload
// @desc    Create a new project with image upload
// @access  Private
router.post('/upload', protect, upload.single('image'), async (req, res) => {
    try {
        const projectData = {
            ...req.body,
            technologies: req.body.technologies ? JSON.parse(req.body.technologies) : []
        };

        if (req.file) {
            projectData.image = req.file.path; // Cloudinary URL
        }

        const project = await Project.create(projectData);
        res.status(201).json(project);
    } catch (error) {
        console.error('Error creating project with upload:', error);
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/projects/:id
// @desc    Update a project
// @access  Private
router.put('/:id', protect, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json(updatedProject);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/projects/:id/upload
// @desc    Update a project with image upload
// @access  Private
router.put('/:id/upload', protect, upload.single('image'), async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const updateData = {
            ...req.body,
            technologies: req.body.technologies ?
                (typeof req.body.technologies === 'string' ? JSON.parse(req.body.technologies) : req.body.technologies)
                : project.technologies
        };

        if (req.file) {
            updateData.image = req.file.path; // Cloudinary URL
        }

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        res.json(updatedProject);
    } catch (error) {
        console.error('Error updating project with upload:', error);
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        await project.deleteOne();
        res.json({ message: 'Project removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
