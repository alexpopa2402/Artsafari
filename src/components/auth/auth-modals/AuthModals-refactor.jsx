import { useState } from 'react';
import PropTypes from 'prop-types';
import './AuthModals-style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import YBlogosplash from '@assets/images/YBlogosplash2.png';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import ForgotPasswordModal from './ForgotPasswordModal';

const AuthModals = ({ onClose }) => {
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
                            <span style={{ visibility: 'hidden', fontSize: '20px' }}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        )}
                        <img src={YBlogosplash} alt="Youngblood Logo" className="logo" />
                        <span className="close-popup" onClick={onClose}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </div>

                    {!showThankYouMessage && (
                        <div className='popup-sub-title'>
                            {popupType === 'login' && 'Login to your account'}
                            {popupType === 'forgotPassword' && 'Reset your password'}
                            {popupType === 'signUp' && 'Create an account'}
                        </div>
                    )}
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
                            <LoginModal
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                                errors={errors}
                                setErrors={setErrors}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                                setShowThankYouMessage={setShowThankYouMessage}
                                setPopupType={setPopupType}
                            />
                        )}
                        {popupType === 'forgotPassword' && (
                            <ForgotPasswordModal
                                email={email}
                                setEmail={setEmail}
                                errors={errors}
                                setErrors={setErrors}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                                setShowThankYouMessage={setShowThankYouMessage}
                                setPopupType={setPopupType}
                            />
                        )}
                        {popupType === 'signUp' && (
                            <SignUpModal
                                name={name}
                                setName={setName}
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                                errors={errors}
                                setErrors={setErrors}
                                passwordStrength={passwordStrength}
                                setPasswordStrength={setPasswordStrength}
                                isLoading={isLoading}
                                setIsLoading={setIsLoading}
                                setShowThankYouMessage={setShowThankYouMessage}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

AuthModals.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default AuthModals;