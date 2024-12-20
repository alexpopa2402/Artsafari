import { useState, useRef, useEffect, FormEvent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { handleLogin, handlePasswordChange } from '@utils/authHandlers';
import { validateEmail } from '../../../utils/authValidation';
import SocialLoginModal from './SocialLoginModal';
import Spinner from '@components/loading-skeletons/Spinner/Spinner';

interface LoginModalProps {
    setPopupType: (type: 'login' | 'forgotPassword' | 'signUp') => void;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ setPopupType }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
            try {
                const success = await handleLogin(email, password, setErrors);
                if (!success) {
                    setLoading(false);
                }
            } catch (error) {
                console.error('Login failed:', error);
                setLoading(false);
            }
    };

    /* when opening modal, it focuses on the email field */
    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    return (
        <div className="popup-body" role="dialog" aria-labelledby="login-modal-title" aria-modal="true">
            <form onSubmit={onSubmit}>
                <div className='popup-sub-title'> Log into your account</div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        ref={emailRef}
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
                <button type="submit" className="popup-login-button" disabled={!validateEmail(email) || loading || !password}>
                    {loading ? <Spinner /> : 'Login'}
                </button>
                <SocialLoginModal />
            </form>
            <div className="popup-links">
                <button type="button" onClick={() => setPopupType('signUp')} className="popup-link-button">Don&apos;t have an account? Sign Up</button>
                <button type="button" onClick={() => setPopupType('forgotPassword')} className="popup-link-button">Forgot password?</button>
            </div>
        </div>
    );
};

console.log('Rendering LoginModal Component');
export default LoginModal;