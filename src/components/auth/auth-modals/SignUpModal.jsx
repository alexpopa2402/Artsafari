import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSpinner, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import SocialLoginModal from './SocialLoginModal';
import { handlePasswordChange, handleNameChange, handleSubmit, handleSignUp } from './authHandlers';
import { validateEmail, validatePassword } from './authValidation';

const SignUpModal = ({ onClose, setPopupType }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '', name: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showThankYouMessage, setShowThankYouMessage] = useState(false);

    return (
        <div className="overlay" onClick={onClose}>
            <div className="popup-form" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <span className="previous-popup" onClick={() => setPopupType('login')}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </span>
                    <h2>Create an account</h2>
                    <span className="close-popup" onClick={onClose}>
                        &times;
                    </span>
                </div>
                {showThankYouMessage ? (
                    <div className="thank-you-message">
                        <h3>Thanks for signing up!</h3>
                        <p>Please check your Inbox or Spam folder for the profile activation link.</p>
                        <button onClick={onClose}>Close</button>
                    </div>
                ) : (
                    <div className="popup-body">
                        <form onSubmit={(e) => handleSubmit(e, 'signUp', email, password, name, setErrors, handleSignUp, setIsLoading, setShowThankYouMessage)}>
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
                                        onChange={(e) => handlePasswordChange(e, setPassword, setPasswordStrength, setErrors, errors, 'signUp')}
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
                        <span className="continue-with">or continue with</span>
                        <SocialLoginModal />
                        <p className="terms-text">
                            By clicking Sign Up, you agree to Artsafari&aposs Terms and Conditions and Privacy Policy.
                        </p>
                        <p className="recaptcha-text">
                            This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                        </p>
                    </div>)}
            </div>
        </div>
    );
};

SignUpModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    setPopupType: PropTypes.func.isRequired,
};

export default SignUpModal;
