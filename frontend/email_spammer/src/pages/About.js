import React from "react";

function About() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px",
        color: "white",
        display: "flex",
        justifyContent: "center",
        fontSize: "1.2rem",
      }}
    >
      <p>
        Our Email Spam Detector is a powerful tool designed to enhance your
        cybersecurity by accurately identifying spam emails. This application
        leverages advanced AI algorithms to analyze the content and subject line
        of emails to determine if they are spam. Users have the flexibility to
        choose from multiple AI models for classification, including Logistic
        Regression, Decision Tree, Random Forest, SVM, and Neural Network. Each
        model has been trained on a large dataset of email examples, allowing
        the system to make precise judgments about the nature of the emails. By
        integrating cutting-edge machine learning techniques, the Email Spam
        Historically, the challenge of spam detection has plagued email
        communication, leading to wasted time and increased risks of phishing
        and malware attacks. Our application addresses these issues head-on,
        providing a user-friendly interface where you can quickly submit emails
        for classification. The process is straightforward—simply enter the
        subject line and the body of the email, select your preferred
        classification model, and submit. Within seconds, you will receive a
        result indicating whether the email is considered spam. The Email Spam
        Detector is ideal for individuals looking to safeguard their inboxes
        from unwanted emails and for organizations aiming to protect their
        employees and IT infrastructure from the threats posed by spam. With its
        robust framework and easy-to-use design, our tool not only improves
        security but also enhances the efficiency of email management. Try our
        Email Spam Detector today and experience a cleaner, safer email
        environment.
      </p>
    </div>
  );
}

export default About;
