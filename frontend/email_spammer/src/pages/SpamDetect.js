import React, { useState } from "react";
import axios from "axios";
import "./SpamDetect.css";

const SpamDetect = () => {
  const [emailContent, setEmailContent] = useState("");
  const [subjectLine, setSubjectLine] = useState("");
  const [classificationMethod, setClassificationMethod] = useState("LR");
  const [classificationResult, setClassificationResult] = useState("");
  const [error, setError] = useState("");

  const handleSubjectLine = (e) => {
    setSubjectLine(e.target.value);
  };

  const handleInputChange = (e) => {
    setEmailContent(e.target.value);
  };

  const handleMethodChange = (e) => {
    console.log(e.target.value);
    setClassificationMethod(e.target.value);
  };

  const handleSubmit = async () => {
    if (subjectLine === "" && emailContent === "") {
      setClassificationResult("Fields are empty");
      return;
    }
    setClassificationResult("");
    setError("");
    console.log(classificationMethod);
    try {
      const response = await axios.post(`http://127.0.0.1:5000/api`, {
        subjectLine,
        emailContent,
        method: classificationMethod,
      });
      console.log(response.data);
      setClassificationResult(response.data.output);
    } catch (err) {
      setError("Failed to classify the email. Please try again.");
    }
  };

  return (
    <div className="spam-container">
      <h1 className="title">Spam Email Detector</h1>
      <div>
        <select
          value={classificationMethod}
          onChange={handleMethodChange}
          className="select"
        >
          <option value="LR">Logistic Regression</option>
          <option value="DT">Decision Tree</option>
          <option value="RF">Random Forest</option>
          <option value="SVM">SVM</option>
          <option value="NN">Neural Network</option>
        </select>
      </div>
      <input
        value={subjectLine}
        onChange={handleSubjectLine}
        placeholder="Enter Subject here"
        className="input"
      />
      <textarea
        value={emailContent}
        onChange={handleInputChange}
        placeholder="Paste the email content here..."
        rows="20"
        cols="50"
        className="textarea"
      ></textarea>
      <br />
      <button onClick={handleSubmit} className="button">
        Classify Email
      </button>
      {classificationResult && (
        <p>Classification Result: {classificationResult}</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default SpamDetect;
