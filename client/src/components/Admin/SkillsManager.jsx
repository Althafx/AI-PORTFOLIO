import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { getAuthHeaders } from '../../utils/auth';
import './SkillsManager.css';

const SkillsManager = () => {
    const [skills, setSkills] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Frontend',
        proficiency: 50
    });
    const [message, setMessage] = useState('');

    const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other'];

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const response = await api.get('/api/skills');
            setSkills(response.data);
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            if (editingSkill) {
                await api.put(`/api/skills/${editingSkill._id}`, formData, {
                    headers: getAuthHeaders()
                });
                setMessage('Skill updated successfully!');
            } else {
                await api.post('/api/skills', formData, {
                    headers: getAuthHeaders()
                });
                setMessage('Skill added successfully!');
            }

            resetForm();
            fetchSkills();
        } catch (error) {
            setMessage('Error: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleEdit = (skill) => {
        setEditingSkill(skill);
        setFormData({
            name: skill.name,
            category: skill.category,
            proficiency: skill.proficiency
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this skill?')) return;

        try {
            await api.delete(`/api/skills/${id}`, {
                headers: getAuthHeaders()
            });
            setMessage('Skill deleted successfully!');
            fetchSkills();
        } catch (error) {
            setMessage('Error deleting skill: ' + (error.response?.data?.message || error.message));
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            category: 'Frontend',
            proficiency: 50
        });
        setEditingSkill(null);
        setShowForm(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {});

    return (
        <div className="skills-manager">
            <div className="manager-header">
                <h2>Manage Skills</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? 'Cancel' : '+ Add New Skill'}
                </button>
            </div>

            {message && (
                <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
                    {message}
                </div>
            )}

            {showForm && (
                <form onSubmit={handleSubmit} className="skill-form glass">
                    <h3>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h3>

                    <div className="form-group">
                        <label>Skill Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="e.g., React, Node.js, MongoDB"
                        />
                    </div>

                    <div className="form-group">
                        <label>Category *</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Proficiency: {formData.proficiency}%</label>
                        <input
                            type="range"
                            name="proficiency"
                            value={formData.proficiency}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            step="5"
                        />
                        <div className="proficiency-bar">
                            <div
                                className="proficiency-fill"
                                style={{ width: `${formData.proficiency}%` }}
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">
                            {editingSkill ? 'Update Skill' : 'Add Skill'}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={resetForm}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <div className="skills-list">
                {Object.keys(groupedSkills).length === 0 ? (
                    <p className="empty-state">No skills yet. Add your first skill!</p>
                ) : (
                    Object.entries(groupedSkills).map(([category, categorySkills]) => (
                        <div key={category} className="skill-category">
                            <h3>{category}</h3>
                            <div className="category-skills">
                                {categorySkills.map((skill) => (
                                    <div key={skill._id} className="skill-item glass">
                                        <div className="skill-info">
                                            <h4>{skill.name}</h4>
                                            <div className="skill-bar">
                                                <div
                                                    className="skill-progress"
                                                    style={{ width: `${skill.proficiency}%` }}
                                                />
                                            </div>
                                            <span className="proficiency-text">{skill.proficiency}%</span>
                                        </div>
                                        <div className="skill-actions">
                                            <button className="btn btn-secondary" onClick={() => handleEdit(skill)}>
                                                Edit
                                            </button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(skill._id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SkillsManager;
