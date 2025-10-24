// Router.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Pages
import SignIn from './pages/SignIn';
import Login from './pages/Login';
// import LoginSuccess from './pages/LoginSucess';
import ForgotPassword from './pages/ForgotPassword';
import OtpVerification from './pages/OtpVerification';
import ResetPassword from './pages/ResetPassword';
import AppHome from './App'; // Your Notes App

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                {/* Home page is your Notes app */}
                <Route path="/" element={<AppHome />} /> 

                {/* Authentication pages */}
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/otp-verification" element={<OtpVerification />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                
                {/* Optional success page */}
                {/* <Route path="/login-success" element={<LoginSuccess />} /> */}
            </Routes>
        </Router>
    );
}
