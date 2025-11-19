import { useState, useEffect } from 'react';
import { getToken, removeToken, isAuthenticated } from '../../utils/auth';
import Login from './Login';
import ProfileEditor from './ProfileEditor';
import ProjectManager from './ProjectManager';
import SkillsManager from './SkillsManager';
import './Dashboard.css';

const Dashboard = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        setAuthenticated(isAuthenticated());
        setLoading(false);
    };

    const handleLogout = () => {
        removeToken();
        setAuthenticated(false);
    };

    if (loading) {
        return <div className="loading-screen">Loading...</div>;
    }

    if (!authenticated) {
        return <Login onLogin={() => setAuthenticated(true)} />;
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header glass">
                <h1>Admin Dashboard</h1>
                <div className="header-actions">
                    <a href="/" className="btn btn-secondary">View Portfolio</a>
                    <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                </div>
            </div>

            <div className="dashboard-layout">
                <aside className="dashboard-sidebar glass">
                    <nav className="dashboard-nav">
                        <button
                            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                            </svg>
                            Overview
                        </button>

                        <button
                            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                            onClick={() => setActiveTab('profile')}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            Profile
                        </button>

                        <button
                            className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
                            onClick={() => setActiveTab('projects')}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                            </svg>
                            Projects
                        </button>

                        <button
                            className={`nav-item ${activeTab === 'skills' ? 'active' : ''}`}
                            onClick={() => setActiveTab('skills')}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                            </svg>
                            Skills
                        </button>
                    </nav>
                </aside>

                <main className="dashboard-main">
                    {activeTab === 'overview' && (
                        <div className="overview-content">
                            <h2>Welcome to Your Admin Panel</h2>
                            <p className="overview-description">
                                Manage your portfolio content from here. Use the sidebar to navigate between different sections.
                            </p>

                            <div className="quick-stats">
                                <div className="stat-card glass">
                                    <h3>Quick Actions</h3>
                                    <div className="action-buttons">
                                        <button className="btn btn-primary" onClick={() => setActiveTab('profile')}>
                                            Edit Profile
                                        </button>
                                        <button className="btn btn-primary" onClick={() => setActiveTab('projects')}>
                                            Add Project
                                        </button>
                                        <button className="btn btn-primary" onClick={() => setActiveTab('skills')}>
                                            Add Skill
                                        </button>
                                    </div>
                                </div>

                                <div className="stat-card glass">
                                    <h3>📚 Getting Started</h3>
                                    <ul className="checklist">
                                        <li>✅ Admin account created</li>
                                        <li>📝 Update your profile information</li>
                                        <li>💼 Add your projects</li>
                                        <li>🎯 Add your skills</li>
                                        <li>🤖 Test the AI chatbot</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'profile' && <ProfileEditor />}
                    {activeTab === 'projects' && <ProjectManager />}
                    {activeTab === 'skills' && <SkillsManager />}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
