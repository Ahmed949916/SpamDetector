import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import SpamDetector from './SpamDetect';

function App() {
  return (
    <Router>
      <div>
        <nav style={{ backgroundColor: '#0d1117', padding: 20 }}>
          <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around' }}>
            <li style={{ color: 'white' }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
            </li>
            <li>
              <Link to="/about" style={{ textDecoration: 'none', color: 'white' }}>About</Link>
            </li>
            <li>
              <Link to="/spam-detector" style={{ textDecoration: 'none', color: 'white' }}>Spam Detector</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/spam-detector" element={<SpamDetector />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
