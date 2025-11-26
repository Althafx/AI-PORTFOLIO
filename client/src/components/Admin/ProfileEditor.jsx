import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { getAuthHeaders } from '../../utils/auth';
import './ProfileEditor.css';

const ProfileEditor = () => {
    const [profile, setProfile] = useState({
        name: '',
        title: '',
        bio: '',
        shortBio: '',
        longBio: '',
        email: '',
        phone: '',
        location: '',
        github: '',
        linkedin: '',
        twitter: '',
        website: '',
        profileImage: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');


    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.get('/api/profile');
            if (response.data) {
                setProfile(response.data);
                if (response.data.profileImage) {
                    setImagePreview(response.data.profileImage);
                }
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
            const formData = new FormData();

            // Append all profile fields
            Object.keys(profile).forEach(key => {
                if (profile[key] !== null && profile[key] !== undefined) {
                    formData.append(key, profile[key]);
                }
            });

            // Append image file if selected
            if (imageFile) {
                formData.append('profileImage', imageFile);
            }

            await api.put('/api/profile/upload', formData, {
                headers: {
                    ...getAuthHeaders(),
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage('Profile updated successfully!');
            fetchProfile(); // Refresh profile data
        } catch (error) {
            setMessage('Error updating profile: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
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
                    <label>Profile Image</label>
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Profile" />
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                        onChange={handleImageChange}
                    />
                    <small>Upload an image from your computer (max 5MB, formats: JPEG, PNG, GIF, WebP)</small>
                </div>

                <div className="form-group">
                    <label>Short Bio (Hero Section) *</label>
                    <textarea
                        name="shortBio"
                        value={profile.shortBio || ''}
                        onChange={handleChange}
                        required
                        rows="3"
                        placeholder="Brief introduction for the hero section (2-3 sentences)..."
                    />
                    <small>This appears at the top of your portfolio with your profile image</small>
                </div>

                <div className="form-group">
                    <label>Long Bio (About Section) *</label>
                    <textarea
                        name="longBio"
                        value={profile.longBio || ''}
                        onChange={handleChange}
                        required
                        rows="6"
                        placeholder="Detailed description about yourself, your background, and experience..."
                    />
                    <small>This appears in the 'About Me' section</small>
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
