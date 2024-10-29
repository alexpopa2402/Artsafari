import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';

const SocialLoginButtons = () => (
    <>
        <span className="continue-with">or continue with</span>
        <div className="social-login-buttons">
            <button className="social-button apple-button"><FontAwesomeIcon icon={faApple} /></button>
            <button className="social-button google-button"><FontAwesomeIcon icon={faGoogle} /></button>
            <button className="social-button facebook-button"><FontAwesomeIcon icon={faFacebook} /></button>
        </div>
    </>
);

export default SocialLoginButtons;
