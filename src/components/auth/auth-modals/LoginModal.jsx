import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faApple, faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import {
    handleForgotPasswordClick,
    handleSignUpClick,
    handlePasswordChange,
    handleSubmit,
    handleSignUp,
    handleLogin
} from './authHandlers';
import { validateEmail } from './authValidation';

const LoginModal = ({ email, setEmail, password, setPassword, showPassword, setShowPassword, errors, setErrors, isLoading, setIsLoading, setShowThankYouMessage, setPopupType }) => {
    return (
        <div className='popup-body'>
            <form onSubmit={(e) => handleSubmit(e, email, password, name, setErrors, handleSignUp, handleLogin, setIsLoading, setShowThankYouMessage)}>
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
                            onChange={(e) => handlePasswordChange(e, setPassword, null, setErrors, errors, 'login')}
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
                    <button className="social-button apple-button"><FontAwesomeIcon icon={faApple} /></button>
                    <button className="social-button google-button"><FontAwesomeIcon icon={faGoogle} /></button>
                    <button className="social-button facebook-button"><FontAwesomeIcon icon={faFacebook} /></button>
                </div>
            </form>
            <div className="popup-links">
                <a onClick={() => handleForgotPasswordClick(setPopupType, setErrors)}>Forgot password?</a>
                <a onClick={() => handleSignUpClick(setPopupType, setPassword, setErrors)}>Don&apos;t have an account? Sign Up</a>
            </div>
            <p className="terms-text">
                By clicking Login or Continue with Apple, Google, or Facebook, you agree to Artsafari&apos;s Terms and Conditions and Privacy Policy.
            </p>
            <p className="recaptcha-text">
                This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
            </p>
        </div>
    );
};

LoginModal.propTypes = {
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    showPassword: PropTypes.bool.isRequired,
    setShowPassword: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    setErrors: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    setIsLoading: PropTypes.func.isRequired,
    setShowThankYouMessage: PropTypes.func.isRequired,
    setPopupType: PropTypes.func.isRequired,
};

export default LoginModal;