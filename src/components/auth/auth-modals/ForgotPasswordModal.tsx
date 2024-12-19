import { useState, FormEvent } from 'react';
import PropTypes from 'prop-types';
import { handleForgotPasswordClick } from '../../../utils/authHandlers';
import { validateEmail } from '../../../utils/authValidation';

interface ForgotPasswordModalProps {
    setPopupType: (type: 'login' | 'forgotPassword' | 'signUp') => void;
    onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ setPopupType }) => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({ email: '' });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setErrors({ email: 'Invalid email format' });
        } else {
            handleForgotPasswordClick(email);
        }
    };

    return (
        <div className="popup-body">
            <form onSubmit={onSubmit}>
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
