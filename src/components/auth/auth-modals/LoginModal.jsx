import PropTypes from 'prop-types';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState, useRef, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { handlePasswordChange } from '@utils/authHandlers';
import { validateEmail } from '@utils/authValidation';

import SocialLoginModal from './SocialLoginModal';
import Spinner from '@components/loading-skeletons/Spinner/Spinner';

const LoginModal = ({ setPopupType }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const emailRef = useRef(null);

    const supabase = useSupabaseClient();

    const handleLogin = async (email, password, setErrors) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) {
                setErrors({ password: 'Invalid credentials' });
                return false;
            }
            return true;
            } 
        catch (error) {
            setErrors({ password: error.message });
            return false;
        }
    };

    const onSubmit = async (e) => {
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

LoginModal.propTypes = {
    setPopupType: PropTypes.func.isRequired,
};
console.log('Rendering LoginModal Component');
export default LoginModal;