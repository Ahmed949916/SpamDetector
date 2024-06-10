import React, { useState } from 'react';
import axios from 'axios';

const SpamDetect=()=> {
  const [emailContent, setEmailContent] = useState('');
  const [subjectLine, setSubjectLine] = useState('');
  const [classificationResult, setClassificationResult] = useState('');
  const [error, setError] = useState('');

  const handleSubjectLine = (e) => {
    setSubjectLine(e.target.value);
  };

  const handleInputChange = (e) => {
    setEmailContent(e.target.value);
  };

  const handleSubmit = async () => {
    if (subjectLine ===''&& emailContent===''){
      setClassificationResult('Fields are empty');
      return;
    }
    setClassificationResult('');
    setError('');

    try {
  
      const response = await axios.post(` http://127.0.0.1:5000/api`, { subjectLine, emailContent });
      console.log(response.data)
      setClassificationResult(response.data.output);
    } catch (err) {
      setError('Failed to classify the email. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: 'white', height: '100vh', color: '#0d1117', padding: '20px' }}>
      <h1>Spam Email Detector</h1>
      <input
        value={subjectLine}
        onChange={handleSubjectLine}
        placeholder="Enter Subject here"
        style={{
          backgroundColor: 'white',
          color: '#0d1117',
          borderColor: 'grey',
          borderWidth: '1px',
          borderStyle: 'solid',
          width: '100%', 
          padding: '10px',
          borderRadius:10,
          marginBottom:10
        }}
      />
      <textarea
        value={emailContent}
        onChange={handleInputChange}
        placeholder="Paste the email content here..."
        rows="30"
        cols="50"
        style={{
          backgroundColor: 'white',
          color: '#0d1117',
          borderColor: 'grey',
          borderWidth: '1px',
          borderStyle: 'solid',
          width: '100%', // To make it responsive
          padding: '10px',
          borderRadius:10,
        }}
      ></textarea>
      <br />
      <button
        onClick={handleSubmit}
        style={{
          textDecoration: 'none',
          color: 'white', // White text
          backgroundColor: '#007bff', // Bootstrap blue
          padding: '10px 20px',
          borderRadius: '5px',
          fontSize: '1.25rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)', // Subtle shadow
          border:'none',
          cursor:'pointer',
          
        }}
      >
        Classify Email
      </button>
      {classificationResult && <p>Classification Result: {classificationResult}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default SpamDetect;
