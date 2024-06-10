import React, { useState } from 'react';
import axios from 'axios';

function App() {
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
    <div style={{ textAlign: 'center', backgroundColor: 'black', height: '100vh', color: 'white', padding: '20px' }}>
      <h1>Spam Email Detector</h1>
      <input
        value={subjectLine}
        onChange={handleSubjectLine}
        placeholder="Paste the email content here..."
        style={{
          backgroundColor: 'black',
          color: 'white',
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
          backgroundColor: 'black',
          color: 'white',
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
          borderRadius:10,
          backgroundColor: 'blue',
          color: 'white',
          padding: '20px 30px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
          marginTop: '10px'
        }}
      >
        Classify Email
      </button>
      {classificationResult && <p>Classification Result: {classificationResult}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
