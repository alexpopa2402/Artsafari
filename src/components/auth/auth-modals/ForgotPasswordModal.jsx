import PropTypes from 'prop-types';
import { validateEmail } from './authValidation';
import { handleSubmit, handleSignUpClick } from './authHandlers';

const ForgotPasswordModal = ({ email, setEmail, errors, setErrors, isLoading, setIsLoading, setShowThankYouMessage, setPopupType }) => {
    return (
        <div className="popup-body">
            <form onSubmit={(e) => handleSubmit(e, 'forgotPassword', email, '', '', setErrors, null, null, setIsLoading, setShowThankYouMessage)}>
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
                <button type="submit" disabled={!validateEmail(email)}>Send me reset instructions</button>
            </form>
            <div className='popup-no-reset'>
                Don&apos;t need to reset ? <a onClick={() => handleSignUpClick(setPopupType, null, setErrors)}>Sign Up</a>
            </div>
        </div>
    );
};

ForgotPasswordModal.propTypes = {
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    setErrors: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    setIsLoading: PropTypes.func.isRequired,
    setShowThankYouMessage: PropTypes.func.isRequired,
    setPopupType: PropTypes.func.isRequired,
};

export default ForgotPasswordModal;