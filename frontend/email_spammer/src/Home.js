import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Home Page</h1>
      <Link to="/detect-spam">Go to Spam Detector</Link>
    </div>
  );
}

export default Home;

