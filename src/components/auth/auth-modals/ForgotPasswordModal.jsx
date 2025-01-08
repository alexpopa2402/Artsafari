import { useState } from 'react';
import PropTypes from 'prop-types';
import { supabase } from '@services/supabaseClient';
import { validateEmail } from '@utils/authValidation';
import './AuthModals-style.css';

const ForgotPasswordModal = ({ setPopupType }) => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({ email: '' });
    const [successMessage, setSuccessMessage] = useState('');

const recoverPassword = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
        setErrors({ email: 'Invalid email format' });
        return;
    }

    try {
        let { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) {
            setErrors({ email: error.message });
        } else {
            setSuccessMessage('We\'ve sent a link to reset your password if an account is associated with this email.');
        }
    } catch {
        setErrors({ email: 'An unexpected error occurred. Please try again later.' });
    }
};

    return (
        <div className="popup-body">
            <form onSubmit={recoverPassword}>
            <div className='popup-sub-title'> Reset your password</div>
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
                {successMessage && <div className="password-reset-success-message">{successMessage}</div>}
                <button
                    type="submit"
                    disabled={!validateEmail(email)}
                >
                    Send me reset instructions
                </button>
            </form>
            <div className='popup-no-reset'>
                Don&apos;t need to reset? <button className='popup-link-button' onClick={() => setPopupType('signUp')}>Sign Up</button>
            </div>
        </div>
    );
};
ForgotPasswordModal.propTypes = {
    setPopupType: PropTypes.func.isRequired,
};
console.log('Rendering ForgotPasswordModal Component');
export default ForgotPasswordModal;