import { useEffect, useState } from 'react';
import { getImageUrl } from '../../utils/imageUtils';
import './Hero.css';


const Hero = ({ profile }) => {
    const [displayText, setDisplayText] = useState('');
    const fullText = profile?.title || 'Full Stack Developer & AI Enthusiast';

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index <= fullText.length) {
                setDisplayText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 50);

        return () => clearInterval(timer);
    }, [fullText]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="hero" id="home">
            <div className="hero-content container">
                <div className="hero-text fade-in">
                    <h1 className="hero-title">
                        Hi, I'm <span className="gradient-text">{profile?.name || 'Your Name'}</span>
                    </h1>
                    <h2 className="hero-subtitle">
                        <span className="typing-text">{displayText}</span>
                        <span className="cursor">|</span>
                    </h2>
                    <p className="hero-description">
                        {profile?.shortBio || profile?.bio || 'Passionate developer creating innovative solutions with modern technologies.'}
                    </p>

                    <div className="hero-buttons">
                        <button className="btn btn-primary" onClick={() => scrollToSection('projects')}>
                            <span>View My Work</span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button className="btn btn-secondary" onClick={() => scrollToSection('contact')}>
                            <span>Get In Touch</span>
                        </button>
                    </div>


                </div>

                {profile?.profileImage && (
                    <div className="hero-image fade-in">
                        <div className="image-container">
                            <img
                                src={getImageUrl(profile.profileImage)}
                                alt={profile.name}
                                onLoad={() => console.log('Hero image loaded successfully:', profile.profileImage)}
                                onError={(e) => {
                                    console.error('Hero image failed to load:', profile.profileImage);
                                    console.error('Attempted URL:', e.target.src);
                                    // Hide the image container if image fails to load
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="scroll-indicator" onClick={() => scrollToSection('about')}>
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
                <p>Scroll Down</p>
            </div>
        </section>
    );
};

export default Hero;
