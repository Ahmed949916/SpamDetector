# Email Spam Detection

A web application that allows users to upload the content of an email. The application processes the email content, extracts features such as word frequency, and sends these features to trained models at the backend. The models then predict whether the email is spam or not and return the prediction along with the probability to the frontend.

## Spam Detector

- **Objective:** Classify emails as spam or not spam based on their content.
- **Frontend:** Built using React.
- **Backend:**  Built using Flask.

## Features

- **User-friendly frontend:**
  - Built with React.
  - Allows users to upload email content easily.

- **Backend processing:**
  - Extracts features from email content, such as word frequency.
  - Utilizes multiple machine learning models for prediction.

- **Machine learning models:**
  - Random Forest
  - Logistic Regression
  - Support Vector Machine (SVM)
  - Neural Network (NN)
  - Decision Tree

- **Real-time feedback:**
  - Predicts whether the email is spam or not.
  - Provides the probability of the email being spam.

## Installation and Setup

1. **Download and Install Anaconda:**
   - Download Anaconda from the [official website](https://www.anaconda.com/products/distribution).

2. **Open Visual Studio Code within Anaconda Navigator:**
   - Launch Anaconda Navigator and open Visual Studio Code.

3. **Open Two Terminals in Visual Studio Code:**
   - You can split the terminals as needed.

4. **Navigate to the Frontend and Backend Folders:**
   - In the first terminal, navigate to the frontend folder:
     ```sh
     cd path/to/frontend
     ```
   - In the second terminal, navigate to the backend folder:
     ```sh
     cd path/to/backend
     ```

5. **Start the Frontend and Backend Servers:**
   - In the first terminal, start the frontend server:
     ```sh
     npm start
     ```
   - In the second terminal, start the backend server:
     ```sh
     python flask_server.py
     ```

## Usage

1. Open your browser and go to `http://localhost:3000`.
2. Enter the subject and paste the email content using the provided form.
3. Select the desired model for classification from the dropdown menu.
4. Click the "Classify Email" button.
5. The application will process the email, extract features, and send them to the backend.
6. The backend will use the trained models to predict whether the email is spam or not.
7. The prediction and probability will be displayed on the frontend.

## Screenshot
![WhatsApp Image 2024-07-19 at 00 45 20_a2e359d0](https://github.com/user-attachments/assets/29736797-677f-4df2-bfc3-3558711724f7)


## Learning Outcomes

- Understanding of frontend development with React.
- Experience with backend processing and machine learning model deployment.
- Knowledge of feature extraction and real-time data processing.

## Future Improvements

- Improve the user interface for better user experience.
- Add more advanced feature extraction techniques.
- Integrate more machine learning models and compare their performance.
- Implement a more scalable backend architecture.

## Contributing

If you would like to contribute to the development of this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

---

Enjoy using the Email Spam Detection application! 📧🚫
