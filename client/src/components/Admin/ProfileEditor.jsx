import { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthHeaders } from '../../utils/auth';
import './ProfileEditor.css';

const ProfileEditor = () => {
    const [profile, setProfile] = useState({
        name: '',
        title: '',
        bio: '',
        email: '',
        phone: '',
        location: '',
        github: '',
        linkedin: '',
        twitter: '',
        website: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get('/api/profile');
            if (response.data) {
                setProfile(response.data);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await axios.put('/api/profile', profile, {
                headers: getAuthHeaders()
            });
            setMessage('Profile updated successfully!');
        } catch (error) {
            setMessage('Error updating profile: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    return (
        <div className="profile-editor">
            <h2>Edit Profile</h2>

            {message && (
                <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={profile.title}
                            onChange={handleChange}
                            required
                            placeholder="e.g., Full Stack Developer"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Bio *</label>
                    <textarea
                        name="bio"
                        value={profile.bio}
                        onChange={handleChange}
                        required
                        rows="4"
                        placeholder="Tell visitors about yourself..."
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Location</label>
                    <input
                        type="text"
                        name="location"
                        value={profile.location}
                        onChange={handleChange}
                        placeholder="City, Country"
                    />
                </div>

                <h3>Social Links</h3>

                <div className="form-group">
                    <label>GitHub URL</label>
                    <input
                        type="url"
                        name="github"
                        value={profile.github}
                        onChange={handleChange}
                        placeholder="https://github.com/yourusername"
                    />
                </div>

                <div className="form-group">
                    <label>LinkedIn URL</label>
                    <input
                        type="url"
                        name="linkedin"
                        value={profile.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/yourusername"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Twitter URL</label>
                        <input
                            type="url"
                            name="twitter"
                            value={profile.twitter}
                            onChange={handleChange}
                            placeholder="https://twitter.com/yourusername"
                        />
                    </div>

                    <div className="form-group">
                        <label>Website URL</label>
                        <input
                            type="url"
                            name="website"
                            value={profile.website}
                            onChange={handleChange}
                            placeholder="https://yourwebsite.com"
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Profile'}
                </button>
            </form>
        </div>
    );
};

export default ProfileEditor;
