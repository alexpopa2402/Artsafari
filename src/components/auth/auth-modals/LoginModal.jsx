import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import SocialLoginModal from './SocialLoginModal';
import TermsText from './TermsText';
import {handleLogin, handlePasswordChange } from '@utils/authHandlers';
import { validateEmail } from '../../../utils/authValidation';

const LoginModal = ({ setPopupType }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });

    const onSubmit = (e) => {
        e.preventDefault();
        handleLogin(email, password, setErrors);
    };

    return (
        <div className="popup-body">
                <form onSubmit={onSubmit}>
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
                            onChange={(e) => handlePasswordChange(e, setPassword, setErrors, errors, 'login')}
                            required
                        />
                        <span
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <button type="submit" className="popup-login-button" disabled={!validateEmail(email)}>
                    {'Login'}
                </button>
                <span className="continue-with">or continue with</span>
                <SocialLoginModal />
            </form>
            <div className="popup-links">
                <a onClick={() => setPopupType('forgotPassword')}>Forgot password?</a>
                <a onClick={() => setPopupType('signUp')}>Don&apos;t have an account? Sign Up</a>
            </div>
            <TermsText />
        </div>
    );
};

LoginModal.propTypes = {
    setPopupType: PropTypes.func.isRequired,
};
export default LoginModal;
