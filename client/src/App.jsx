import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { API_URL } from './config';
import EveRobot from './components/EveRobot/EveRobot';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Dashboard from './components/Admin/Dashboard';
import Loading from './components/Loading/Loading';
import './App.css';

function Portfolio() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/profile`);
      if (response.ok) {
        const data = await response.json();
        console.log('Profile data received:', data);
        console.log('Profile image URL:', data.profileImage);
        setProfile(data);
        document.title = `${data.name} | Portfolio`;
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      // Add a minimum loading time of 1 second for smooth UX
      setTimeout(() => setLoading(false), 1000);
    }
  };

  // Show loading screen while fetching data
  if (loading) {
    return <Loading />;
  }

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
          <p className="footer-tech">Built with React, Node.js, MongoDB & Groq AI</p>
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
