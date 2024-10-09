import { useState, } from 'react';
import { supabase } from '../../../Client/supabaseClient';
import PropTypes from 'prop-types';
import './LoginRegisterCard-style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginRegisterCard = ({ onClose }) => {
    const [popupType, setPopupType] = useState('login'); // 'login', 'forgotPassword', 'signUp'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');
    const [showThankYouMessage, setShowThankYouMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleForgotPasswordClick = () => {
        setPopupType('forgotPassword');
        setErrors({ email: '', password: '' }); // Clear errors
    };

    const handleSignUpClick = () => {
        setPopupType('signUp');
        setPassword('');
        setErrors({ email: '', password: '' }); // Clear errors
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordRegex.test(password)) {
            return 'Password must be at least 6 characters and include an upper case letter, a lower case letter, a number, and a symbol';
        }
        return '';
    };

    const calculatePasswordStrength = (password) => {
        let strength = '';
        if (password.length >= 6) {
            if (password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)) {
                strength = 'strong';
            } else if (password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)) {
                strength = 'moderate';
            } else {
                strength = 'weak';
            }
        }
        setPasswordStrength(strength);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;
        let newErrors = { email: '', password: '' };
    
        if (!validateEmail(email)) {
            newErrors.email = 'Invalid email format';
            valid = false;
        }
    
        if (popupType === 'signUp') {
            const passwordError = validatePassword(password);
            if (passwordError) {
                newErrors.password = passwordError;
                valid = false;
            }
        }

        setErrors(newErrors);
    
        if (valid) {
            if (popupType === 'signUp') {
                await handleSignUp();
            } else if (popupType === 'login') {
                await handleLogin();
            }
        }
    };

    const handleSignUp = async () => {
        setIsLoading(true);
        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        });
        setIsLoading(false);
        if (error) {
            setErrors({ ...errors, email: error.message });
        } else {
            setShowThankYouMessage(true);
        }
    };

    const handleLogin = async () => {
        const { data: { session }, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            setErrors({ ...errors, password: 'Invalid credentials' });
        } else {
            window.location.href = '/profile';
        }
    };

    return (
        <div className="overlay" onClick={onClose}>
            <div className="popup-form" onClick={(e) => e.stopPropagation()}>
                <span className="close-popup" onClick={onClose}>×</span>
                {showThankYouMessage ? (
                    <div className="thank-you-message">
                        <h2>Thanks for signing up!</h2>
                        <p>Please check your Inbox for the registration link in order to activate your profile!</p>
                        <button onClick={onClose}>Close</button>
                    </div>
                ) : (
                    <>
                        {popupType === 'login' && (
                            <>
                                <h2>Youngblood</h2>
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
                                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                            </span>
                                        </div>
                                        {errors.password && <span className="error">{errors.password}</span>}
                                    </div>
                                    <button type="submit" disabled={!validateEmail(email)}>Login</button>
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
                                                    const newPassword = e.target.value;
                                                    setPassword(newPassword);
                                                    calculatePasswordStrength(newPassword);
                                                    
                                                    const passwordError = validatePassword(newPassword);
                                                    if (newPassword === '') {
                                                        setErrors({ ...errors, password: '' });
                                                    } else {
                                                        setErrors({ ...errors, password: passwordError });
                                                    }
                                                }}
                                                required
                                            />
                                            <span
                                                className={`password-toggle ${showPassword ? "show" : "hide"}`}
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                            </span>
                                        </div>
                                        {errors.password && <span className="error">{errors.password}</span>}
                                        <div className="password-strength-bar-container">
                                            <div className={`password-strength-bar ${passwordStrength}`}></div>
                                        </div>
                                        <div className="password-strength-text">
                                            Strength: {passwordStrength === 'strong' ? 'Strong' : passwordStrength === 'moderate' ? 'Moderate' : 'Weak'}
                                        </div>
                                    </div>
                                    <button type="submit" disabled={isLoading}>
                                        {isLoading ? 'Loading...' : 'Sign Up'}
                                    </button>
                                </form>
                            </>
                        )}
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