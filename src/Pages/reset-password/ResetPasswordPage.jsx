import { useState } from 'react';
import { supabase } from '@services/supabaseClient';
import { validatePassword } from '@utils/authValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './ResetPasswordPage-style.css'

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({ newPassword: '', confirmPassword: '' });
    const [successMessage, setSuccessMessage] = useState('');

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        const passwordError = validatePassword(newPassword);
        if (passwordError) {
            setErrors({ ...errors, newPassword: passwordError });
            return;
        }
        if (newPassword !== confirmPassword) {
            setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
            return;
        }

        try {
            const { error } = await supabase.auth.updateUser({
                email,
                password: newPassword,
            });
            if (error) {
                setErrors({ ...errors, newPassword: error.message });
            } else {
                setSuccessMessage('Your password has been successfully updated.');
            }
        } catch {
            setErrors({ ...errors, newPassword: 'An unexpected error occurred. Please try again later.' });
        }
    };

    const clearErrors = () => {
        setErrors({ newPassword: '', confirmPassword: '' });
    };

    return (
        <div className="popup-body">
            <form onSubmit={handlePasswordChange} className="popup-form">
                <div className='popup-sub-title'>Reset your password</div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); clearErrors(); }}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                        <input
                            type={showNewPassword ? "text" : "password"}
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => { setNewPassword(e.target.value); clearErrors(); }}
                            required
                        />
                        <span
                            className="password-toggle"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                            <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                        </span>
                    {errors.newPassword && <span className="error">{errors.newPassword}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => { setConfirmPassword(e.target.value); clearErrors(); }}
                            required
                        />
                        <span
                            className="password-toggle"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                        </span>
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                </div>
                {successMessage && <div className="password-reset-success-message">{successMessage}</div>}
                <button type="submit" className="popup-signup-button">
                    Change My Password
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;