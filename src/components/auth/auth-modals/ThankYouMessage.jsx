import PropTypes from "prop-types";
import './AuthModals-style.css';

const ThankYouMessage = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="thank-you-message">
                <h3>Thanks for signing up!</h3>
                <p>Please check your Inbox or Spam folder for the profile activation link.</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};
ThankYouMessage.propTypes = {
    onClose: PropTypes.func.isRequired,

};
export default ThankYouMessage;