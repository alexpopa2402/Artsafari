import { useState } from 'react';
import PropTypes from 'prop-types';
import './LoginRegisterCard-style.css';

const LoginRegisterCard = ({ onClose }) => {
    const [popupType, setPopupType] = useState('login'); // 'login', 'forgotPassword', 'signUp'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');

    const handleForgotPasswordClick = () => {
        setPopupType('forgotPassword');
    };

    const handleSignUpClick = () => {
        setPopupType('signUp');
        setPassword(''); // Clear the password field
    };

    //Validation functions for email and password
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return re.test(password);
    };

    const calculatePasswordStrength = (password) => {
        let strength = '';
        if (password.length >= 6) {
            if (password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)) {
                strength = 'strong';
            } else if (password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)) {
                strength = 'medium';
            } else {
                strength = 'weak';
            }
        }
        setPasswordStrength(strength);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = true;
        let newErrors = { email: '', password: '' };

        if (!validateEmail(email)) {
            newErrors.email = 'Invalid email format';
            valid = false;
        }

        if (!validatePassword(password)) {
            newErrors.password = 'Password must be at least 6 characters and include an upper case letter, a lower case letter, a number, and a symbol';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            // Handle form submission logic here
            onClose();
        }
    };

    return (
        <div className="overlay" onClick={onClose}>
            <div className="popup-form" onClick={(e) => e.stopPropagation()}>
                <span className="close-popup" onClick={onClose}>×</span>
                {popupType === 'login' && (
                    <>
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                {errors.email && <span className="error">{errors.email}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <div className="password-input-container">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <span
                                        className={`password-toggle ${showPassword ? "show" : "hide"}`}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "🙈" : "👁️"}
                                    </span>
                                </div>
                                {errors.password && <span className="error">{errors.password}</span>}
                            </div>
                            <button type="submit">Login</button>
                        </form>
                        <div className="popup-links">
                            <a onClick={handleForgotPasswordClick}>Forgot password?</a>
                            <a onClick={handleSignUpClick}>Don&apos;t have an account? Sign Up</a>
                        </div>
                    </>
                )}
                {popupType === 'forgotPassword' && (
                    <>
                        <h2>Forgot Password</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                {errors.email && <span className="error">{errors.email}</span>}
                            </div>
                            <button type="submit">Reset Password</button>
                        </form>
                    </>
                )}
                {popupType === 'signUp' && (
                    <>
                        <h2>Sign Up</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                {errors.email && <span className="error">{errors.email}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <div className="password-input-container">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            calculatePasswordStrength(e.target.value);
                                            if (validatePassword(e.target.value)) {
                                                setErrors({ ...errors, password: '' });
                                            } else {
                                                setErrors({ ...errors, password: 'Password must be at least 6 characters and include an upper case letter, a lower case letter, a number, and a symbol' });
                                            }
                                            if (e.target.value === '') {
                                                setErrors({ ...errors, password: '' });
                                            }
                                        }}
                                        required
                                    />
                                    <span
                                        className={`password-toggle ${showPassword ? "show" : "hide"}`}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "🙈" : "👁️"}
                                    </span>
                                </div>
                                {errors.password && <span className="error">{errors.password}</span>}
                                <div className="password-strength-bar-container">
                                    <div className={`password-strength-bar ${passwordStrength}`}></div>
                                </div>
                                <div className="password-strength-text">
                                    Strength: {passwordStrength === 'strong' ? 'Strong' : passwordStrength === 'medium' ? 'Moderate' : 'Weak'}
                                </div>
                            </div>
                            <button type="submit">Sign Up</button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

LoginRegisterCard.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default LoginRegisterCard;