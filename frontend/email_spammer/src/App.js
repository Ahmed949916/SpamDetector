import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SpamDetector from "./pages/SpamDetect";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/spam-detector" className="nav-link">
                Spam Detector
              </Link>
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
