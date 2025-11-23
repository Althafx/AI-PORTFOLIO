import { useState, useEffect } from 'react';
import './About.css';

const About = () => {
    const [profile, setProfile] = useState(null);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [profileRes, skillsRes] = await Promise.all([
                fetch('/api/profile'),
                fetch('/api/skills')
            ]);

            if (profileRes.ok) setProfile(await profileRes.json());
            if (skillsRes.ok) setSkills(await skillsRes.json());
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {});

    return (
        <section className="about" id="about">
            <div className="container">
                <div className="section-header fade-in">
                    <h2 className="section-title">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <p className="section-description">
                        Get to know more about my background and skills
                    </p>
                </div>

                <div className="about-content">
                    {profile && (
                        <div className="about-bio glass fade-in">
                            <h3>Who I Am</h3>
                            <p>{profile.longBio || profile.bio}</p>
                            {profile.email && (
                                <div className="contact-info">
                                    <div className="contact-item">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                        <span>{profile.email}</span>
                                    </div>
                                    {profile.location && (
                                        <div className="contact-item">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            <span>{profile.location}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="skills-section">
                        <h3 className="skills-title">Skills & Technologies</h3>
                        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                            <div key={category} className="skill-category fade-in">
                                <h4 className="category-title">{category}</h4>
                                <div className="skills-grid">
                                    {categorySkills.map((skill) => (
                                        <div key={skill._id} className="skill-item glass">
                                            <div className="skill-header">
                                                <span className="skill-name">{skill.name}</span>
                                                <span >ㅤ</span>
                                                <span className="skill-percent">{skill.proficiency}%</span>
                                            </div>
                                            <div className="skill-bar">
                                                <div
                                                    className="skill-progress"
                                                    style={{ width: `${skill.proficiency}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
