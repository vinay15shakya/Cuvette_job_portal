import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import OTPVerificationPage from './components/OTPVerificationPage';
import CreateInterviewPage from './components/CreateInterviewPage';
import LastPage from './components/LastPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/otp-verification" element={<OTPVerificationPage />} />
        <Route path="/create-interview" element={<CreateInterviewPage />} />
        <Route path="/last-page" element={<LastPage />} />
      </Routes>
    </Router>
  );
}

export default App;
