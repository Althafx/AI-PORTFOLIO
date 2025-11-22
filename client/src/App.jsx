import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EveRobot from './components/EveRobot/EveRobot';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Dashboard from './components/Admin/Dashboard';
import './App.css';

function Portfolio() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        document.title = `${data.name} | Portfolio`;
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  return (
    <div className="app">
      <EveRobot />

      <nav className="navbar glass">
        <div className="container nav-container">
          <a href="/" className="logo gradient-text">
            {profile?.name || 'Portfolio'}
          </a>

          <div className="nav-links">
            <a href="/#home" className="nav-link">Home</a>
            <a href="/#about" className="nav-link">About</a>
            <a href="/#projects" className="nav-link">Projects</a>
            <a href="/#contact" className="nav-link">Contact</a>
            <a href="/admin" className="nav-link admin-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM12.93 11.93A7.5 7.5 0 108 15.5a7.5 7.5 0 004.93-4.57z" />
              </svg>
              Admin
            </a>
          </div>
        </div>
      </nav>

      <main>
        <Hero profile={profile} />
        <About />
        <Projects />
        <Contact />
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} {profile?.name || 'Your Name'}. All rights reserved.</p>
          <p className="footer-tech">Built with React, Node.js, MongoDB & Gemini AI</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
