import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="container">
      <h1 className="home-title">Email Spam Detector</h1>
      <Link to="/spam-detector" className="link">
        Get Started
      </Link>
    </div>
  );
}

export default Home;
