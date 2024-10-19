import { useState } from 'react';
import PropTypes from 'prop-types';
import './LoginRegisterCard-style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSpinner, faAngleLeft,faTimes } from '@fortawesome/free-solid-svg-icons';
import { faApple, faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import YBlogosplash from '../../../Assets/YBlogosplash2.png';
import {
    handleForgotPasswordClick,
    handleSignUpClick,
    handlePasswordChange,
    handleNameChange,
    handleSubmit,
    handleSignUp,
    handleLogin
} from './handlers';
import { validateEmail, validatePassword } from './validation';

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

    return (
        <div className="overlay" onClick={onClose}>
            <div className="popup-form" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <div className='popup-main-title'>
                        {popupType !== 'login' ? (
                            <span className="previous-popup" onClick={() => setPopupType('login')}>
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </span>
                        ) : (
                            <span style={{ visibility: 'hidden' }}>
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </span>
                        )}
{/*                         <h2> Youngblood </h2> */}
<img src={YBlogosplash} alt="Youngblood Logo" className="logo" />
                        <span className="close-popup" onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                    </div>

                    <div className='popup-sub-title'>
                        {popupType === 'login' && 'Login to your account'}
                        {popupType === 'forgotPassword' && 'Reset your password'}
                        {popupType === 'signUp' && 'Create an account'}
                    </div>
                </div>
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
                                <div className='popup-body'>
                                <form onSubmit={(e) => handleSubmit(e, popupType, email, password, name, setErrors, handleSignUp, handleLogin, setIsLoading, setShowThankYouMessage)}>
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
                                                onChange={(e) => handlePasswordChange(e, setPassword, setPasswordStrength, setErrors, errors, popupType)}
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
                                    <button type="submit" className="popup-login-button" disabled={!validateEmail(email)}>
                                        {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Login'}
                                    </button>
                                    <span className="continue-with">or continue with</span>
                                    <div className="social-login-buttons">
                                        <button className="social-button apple-button">
                                            <FontAwesomeIcon icon={faApple} /> Apple
                                        </button>
                                        <button className="social-button google-button">
                                            <FontAwesomeIcon icon={faGoogle} /> Google
                                        </button>
                                        <button className="social-button facebook-button">
                                            <FontAwesomeIcon icon={faFacebook} /> Facebook
                                        </button>
                                    </div>
                                </form>
                                <div className="popup-links">
                                    <a onClick={() => handleForgotPasswordClick(setPopupType, setErrors)}>Forgot password?</a>
                                    <a onClick={() => handleSignUpClick(setPopupType, setPassword, setErrors)}>Don&apos;t have an account? Sign Up</a>
                                </div>
                                <p className="terms-text">
                                    By clicking Sign Up or Continue with Email, Apple, Google, or Facebook, you agree to Artsafari&apos;s Terms and Conditions and Privacy Policy.
                                </p>
                                <p className="recaptcha-text">
                                    This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                                </p>
                                </div>
                            </>
                        )}
                        {popupType === 'forgotPassword' && (
                            <>
                            <div className="popup-body">
                                <form onSubmit={(e) => handleSubmit(e, popupType, email, password, name, setErrors, handleSignUp, handleLogin, setIsLoading, setShowThankYouMessage)}>
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
                                    <button type="submit" disabled={!validateEmail(email)}>Send me reset instructions</button>
                                </form>
                                <div>
                                    Don&apos;t need to reset ? <a onClick={() => handleSignUpClick(setPopupType, setPassword, setErrors)}>Sign Up</a>
                                </div>
                                </div>
                            </>
                        )}
                        {popupType === 'signUp' && (
                            <>
                                <div className='popup-body'>
                                <form onSubmit={(e) => handleSubmit(e, popupType, email, password, name, setErrors, handleSignUp, handleLogin, setIsLoading, setShowThankYouMessage)}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Enter your full name"
                                            value={name}
                                            onChange={(e) => handleNameChange(e, setName, setErrors, errors)}
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
                                                onChange={(e) => handlePasswordChange(e, setPassword, setPasswordStrength, setErrors, errors, popupType)}
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
                                    <button type="submit" className="popup-signup-button" disabled={isLoading || !validateEmail(email) || validatePassword(password) !== ''}>
                                        {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Sign Up'}
                                    </button>
                                </form>
                                <p className="terms-text">
                                    By clicking Sign Up or Continue with Email, Apple, Google, or Facebook, you agree to Artsafari&apos;s Terms and Conditions and Privacy Policy.
                                </p>
                                <p className="recaptcha-text">
                                    This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                                </p>
                                </div>
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