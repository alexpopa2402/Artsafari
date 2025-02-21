import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';
import SocialLoginModal from './SocialLoginModal';
import ButtonSpinner from '@components/loaders/spinners/ButtonSpinner/ButtonSpinner';

import { handlePasswordChange, handleNameChange, handleSubmit, handleSignUp } from '@utils/authHandlers';
import { validateEmail, validatePassword } from '@utils/authValidation';

const SignUpModal = ({ setShowThankYouMessage }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '', name: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <div className="popup-body">
                <div className='popup-sub-title'> Create an account</div>
                <form onSubmit={(e) =>
                    handleSubmit(
                        e,
                        'signUp',
                        email,
                        password,
                        name,
                        setErrors,
                        handleSignUp,
                        /*  null,   */ //this is important to be here as it keeps the correct argument order (where handleLogin is null) */
                        setIsLoading,
                        setShowThankYouMessage
                    )}
                >
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
                        {isLoading ? <ButtonSpinner /> : 'Sign Up'}
                    </button>
                </form>
                <SocialLoginModal />
            </div>
        </>
    );
};


SignUpModal.propTypes = {
    setShowThankYouMessage: PropTypes.func.isRequired,
};
console.log('Rendering SignUpModal Component');
export default SignUpModal;