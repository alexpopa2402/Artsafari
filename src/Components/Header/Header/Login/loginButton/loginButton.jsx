import React, { useState } from 'react';
import './loginButton-style.css';

const LoginRegisterButton = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupType, setPopupType] = useState('login'); // 'login', 'forgotPassword', 'signUp'

    const handleButtonClick = () => {
        setPopupType('login');
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleForgotPasswordClick = () => {
        setPopupType('forgotPassword');
        setShowPopup(true);
    };

    const handleSignUpClick = () => {
        setPopupType('signUp');
        setShowPopup(true);
    };

    return (
        <div className="button-container">
            <button className="login-button" onClick={handleButtonClick}>
                Log in / Sign up
            </button>
            {showPopup && (
                <div className="overlay" onClick={handleClosePopup}>
                    <div className="popup-form" onClick={(e) => e.stopPropagation()}>
                        {popupType === 'login' && (
                            <>
                                <h2>Login</h2>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" id="email" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password:</label>
                                        <input type="password" id="password" required />
                                    </div>
                                    <button type="submit">Login</button>
                                </form>
                                <div className="popup-links">
                                    <a onClick={handleForgotPasswordClick}>Forgot password?</a>
                                    <a onClick={handleSignUpClick}>Don't have an account? Sign Up</a>
                                </div>
                            </>
                        )}
                        {popupType === 'forgotPassword' && (
                            <>
                                <h2>Forgot Password</h2>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" id="email" required />
                                    </div>
                                    <button type="submit">Reset Password</button>
                                </form>
                                <button onClick={handleClosePopup}>Close</button>
                            </>
                        )}
                        {popupType === 'signUp' && (
                            <>
                                <h2>Sign Up</h2>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" id="email" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password:</label>
                                        <input type="password" id="password" required />
                                    </div>
                                    <button type="submit">Sign Up</button>
                                </form>
                                <button onClick={handleClosePopup}>Close</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginRegisterButton;