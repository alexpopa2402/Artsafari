import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { validateEmail, validatePassword } from './authValidation';
import { handlePasswordChange, handleNameChange, handleSubmit } from './authHandlers';

const SignUpModal = ({ name, setName, email, setEmail, password, setPassword, showPassword, setShowPassword, errors, setErrors, passwordStrength, setPasswordStrength, isLoading, setIsLoading, setShowThankYouMessage }) => {
    return (
        <div className='popup-body'>
            <form onSubmit={(e) => handleSubmit(e, 'signUp', email, password, name, setErrors, null, null, setIsLoading, setShowThankYouMessage)}>
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
            <p className="terms-text">
                By clicking Sign Up, you agree to Artsafari&apos;s Terms and Conditions and Privacy Policy.
            </p>
            <p className="recaptcha-text">
                This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
            </p>
        </div>
    );
};

SignUpModal.propTypes = {
    name: PropTypes.string.isRequired,
    setName: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    showPassword: PropTypes.bool.isRequired,
    setShowPassword: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    setErrors: PropTypes.func.isRequired,
    passwordStrength: PropTypes.string.isRequired,
    setPasswordStrength: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    setIsLoading: PropTypes.func.isRequired,
    setShowThankYouMessage: PropTypes.func.isRequired,
};

export default SignUpModal;