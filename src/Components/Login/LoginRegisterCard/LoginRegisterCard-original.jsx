//////////////////// original unfactored code /////////////

/* import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../../Client/supabaseClient';
import PropTypes from 'prop-types';
import './LoginRegisterCard-style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { validateName, validateEmail, validatePassword } from './validation';

const LoginRegisterCard = ({ onClose }) => {
    const [popupType, setPopupType] = useState('login'); // 'login', 'forgotPassword', 'signUp'
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '', name: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');
    const [showThankYouMessage, setShowThankYouMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Render count
    const renderCount = useRef(0);

    useEffect(() => {
        renderCount.current += 1;
        console.log(`Render count: ${renderCount.current}`);
    });


    // Password strength calculation
    const calculatePasswordStrength = (password) => {
        let strength = '';
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    
        if (password === '') {
            strength = '';
        } else if (passwordRegex.test(password)) {
            if (password.length >= 12) {
                strength = 'strong';
            } else if (password.length >= 10) {
                strength = 'moderate';
            } else if (password.length >= 8) {
                strength = 'weak';
            }
        } else {
            strength = 'weak';
        }
    
        setPasswordStrength(strength);
    };

    // Handler functions
    const handleForgotPasswordClick = () => {
        setPopupType('forgotPassword');
        setErrors({ email: '', password: '' }); // Clear errors
    };

    const handleSignUpClick = () => {
        setPopupType('signUp');
        setPassword('');
        setErrors({ email: '', password: '', name: '' }); // Clear errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let valid = true;
        let newErrors = { email: '', password: '', name: '' };

        if (!validateEmail(email)) {
            newErrors.email = 'Invalid email format';
            valid = false;
        }

        if (popupType === 'signUp') {
            if (!validateName(name)) {
                newErrors.name = 'Name can only contain letters and spaces';
                valid = false;
            }

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
            options: {
                data: {
                    name,
                }
            }
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
                <span className="close-thanks-popup" onClick={onClose}>×</span>
                {showThankYouMessage ? (
                    <div className="thank-you-message">
                        <h3>Thanks for signing up!</h3>
                        <p>Please check your Inbox or Spam folder for the profile activation link.</p>
                        <button onClick={onClose}>Close</button>
                    </div>
                ) : (
                    <>
                        {popupType === 'login' && (
                            <>
                                <h2>Welcome to Youngblood </h2>
                                <h5 style={{ marginBottom: '0.5rem' }}> — Log in — </h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
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
                                        <label htmlFor="password">Password</label>
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
                                    <p className="terms-text">
                                        By clicking Sign Up or Continue with Email, Apple, Google, or Facebook, you agree to Artsafari&apos;s Terms and Conditions and Privacy Policy.
                                    </p>
                                    <p className="recaptcha-text">
                                        This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                                    </p>
                            </>
                        )}
                        {popupType === 'forgotPassword' && (
                            <>
                                <h2>Forgot Password</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        {errors.email && <span className="error">{errors.email}</span>}
                                    </div>
                                    <button type="submit" disabled={!validateEmail(email)}>Reset Password</button>
                                </form>
                                    <p className="terms-text">
                                        By clicking Sign Up or Continue with Email, Apple, Google, or Facebook, you agree to Artsafari&apos;s Terms and Conditions and Privacy Policy.
                                    </p>
                                    <p className="recaptcha-text">
                                        This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                                    </p>
                            </>
                        )}
                        {popupType === 'signUp' && (
                            <>
                                <h2>Welcome to Youngblood </h2>
                                <h5> — Create an account — </h5>
                                
                                <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Enter your full name"
                                            value={name}
                                            onChange={(e) => {
                                                const newName = e.target.value;
                                                setName(newName);
                                                if (newName === '' || validateName(newName)) {
                                                    setErrors({ ...errors, name: '' });
                                                } else {
                                                    setErrors({ ...errors, name: 'Name can only contain letters and spaces' });
                                                }
                                            }}
                                            required
                                        />
                                        {errors.name && <span className="error">{errors.name}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
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
                                        <label htmlFor="password">Password</label>
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
                                            Strength: {passwordStrength === 'strong' ? 'Great!' : passwordStrength === 'moderate' ? 'Moderate' : 'Weak'}
                                        </div>
                                    </div>
                                    <button type="submit" className="submit-button" disabled={isLoading || !validateEmail(email) || validatePassword(password) !== ''}>
                                        {isLoading ? 'Loading...' : 'Sign Up'}
                                    </button>
                                </form>
                                    <p className="terms-text">
                                        By clicking Sign Up or Continue with Email, Apple, Google, or Facebook, you agree to Artsafari&apos;s Terms and Conditions and Privacy Policy.
                                    </p>
                                    <p className="recaptcha-text">
                                        This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                                    </p>
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
 */