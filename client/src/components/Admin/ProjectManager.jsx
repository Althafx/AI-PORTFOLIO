import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { getAuthHeaders } from '../../utils/auth';
import { getImageUrl } from '../../utils/imageUtils';
import './ProjectManager.css';

const ProjectManager = () => {
    const [projects, setProjects] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        longDescription: '',
        technologies: '',
        githubUrl: '',
        liveUrl: '',
        featured: false
    });
    const [message, setMessage] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await api.get('/api/projects');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const uploadData = new FormData();

            // Append all form fields
            uploadData.append('title', formData.title);
            uploadData.append('description', formData.description);
            uploadData.append('longDescription', formData.longDescription);
            uploadData.append('githubUrl', formData.githubUrl);
            uploadData.append('liveUrl', formData.liveUrl);
            uploadData.append('featured', formData.featured);

            // Append technologies as JSON string
            const technologies = formData.technologies.split(',').map(t => t.trim()).filter(t => t);
            uploadData.append('technologies', JSON.stringify(technologies));

            // Append image file if selected
            if (imageFile) {
                uploadData.append('image', imageFile);
            }

            if (editingProject) {
                await api.put(`/api/projects/${editingProject._id}/upload`, uploadData, {
                    headers: {
                        ...getAuthHeaders(),
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setMessage('Project updated successfully!');
            } else {
                await api.post('/api/projects/upload', uploadData, {
                    headers: {
                        ...getAuthHeaders(),
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setMessage('Project created successfully!');
            }

            resetForm();
            fetchProjects();
        } catch (error) {
            setMessage('Error: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            description: project.description,
            longDescription: project.longDescription || '',
            technologies: project.technologies.join(', '),
            githubUrl: project.githubUrl || '',
            liveUrl: project.liveUrl || '',
            featured: project.featured
        });
        if (project.image) {
            setImagePreview(getImageUrl(project.image));
        }
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;

        try {
            await api.delete(`/api/projects/${id}`, {
                headers: getAuthHeaders()
            });
            setMessage('Project deleted successfully!');
            fetchProjects();
        } catch (error) {
            setMessage('Error deleting project: ' + (error.response?.data?.message || error.message));
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            longDescription: '',
            technologies: '',
            githubUrl: '',
            liveUrl: '',
            featured: false
        });
        setImageFile(null);
        setImagePreview('');
        setEditingProject(null);
        setShowForm(false);
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="project-manager">
            <div className="manager-header">
                <h2>Manage Projects</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? 'Cancel' : '+ Add New Project'}
                </button>
            </div>

            {message && (
                <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
                    {message}
                </div>
            )}

            {showForm && (
                <form onSubmit={handleSubmit} className="project-form glass">
                    <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>

                    <div className="form-group">
                        <label>Project Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Short Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="2"
                            placeholder="Brief description for project card"
                        />
                    </div>

                    <div className="form-group">
                        <label>Long Description</label>
                        <textarea
                            name="longDescription"
                            value={formData.longDescription}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Detailed description (optional)"
                        />
                    </div>

                    <div className="form-group">
                        <label>Technologies (comma-separated) *</label>
                        <input
                            type="text"
                            name="technologies"
                            value={formData.technologies}
                            onChange={handleChange}
                            required
                            placeholder="React, Node.js, MongoDB"
                        />
                    </div>

                    <div className="form-group">
                        <label>Project Image</label>
                        {imagePreview && (
                            <div className="image-preview">
                                <img src={imagePreview} alt="Project" />
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                            onChange={handleImageChange}
                        />
                        <small>Upload an image from your computer (max 5MB, formats: JPEG, PNG, GIF, WebP)</small>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>GitHub URL</label>
                            <input
                                type="url"
                                name="githubUrl"
                                value={formData.githubUrl}
                                onChange={handleChange}
                                placeholder="https://github.com/..."
                            />
                        </div>

                        <div className="form-group">
                            <label>Live URL</label>
                            <input
                                type="url"
                                name="liveUrl"
                                value={formData.liveUrl}
                                onChange={handleChange}
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="featured"
                                checked={formData.featured}
                                onChange={handleChange}
                            />
                            <span>Featured Project</span>
                        </label>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">
                            {editingProject ? 'Update Project' : 'Create Project'}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={resetForm}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <div className="projects-list">
                {projects.length === 0 ? (
                    <p className="empty-state">No projects yet. Add your first project!</p>
                ) : (
                    projects.map((project) => (
                        <div key={project._id} className="project-item glass">
                            <div className="project-info">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className="project-meta">
                                    <div className="tech-tags">
                                        {project.technologies.map((tech, i) => (
                                            <span key={i} className="tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                    {project.featured && <span className="featured-badge">⭐ Featured</span>}
                                    {project.viewCount > 0 && (
                                        <span className="view-count">👁️ {project.viewCount} views</span>
                                    )}
                                </div>
                            </div>
                            <div className="project-actions">
                                <button className="btn btn-secondary" onClick={() => handleEdit(project)}>
                                    Edit
                                </button>
                                <button className="btn btn-danger" onClick={() => handleDelete(project._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProjectManager;
