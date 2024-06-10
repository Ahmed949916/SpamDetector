import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '50px',
      
      height: '60vh', // Full viewport height
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', // Center content vertically
      alignItems: 'center' // Center content horizontally
      
    }}>
      
      <h1 style={{
        marginBottom: '50px',
        fontSize: '5.5rem', // Larger font size
        color: '#333' // Dark grey text
        
      }}>Email Spam Detector </h1>

      


    
      <Link to="/spam-detector" style={{
        textDecoration: 'none',
        color: 'white', // White text
        backgroundColor: '#007bff', // Bootstrap blue
        padding: '10px 20px',
        borderRadius: '5px',
        fontSize: '1.25rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)' // Subtle shadow
      }}>Go to Spam Detector</Link>
    </div>
  );
}

export default Home;
