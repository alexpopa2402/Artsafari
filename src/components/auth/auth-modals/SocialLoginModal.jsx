import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { supabase } from '@services/supabaseClient';

const SocialLoginModal = () => {

    function handleLogin() {
        supabase.auth.signInWithOAuth({
            provider: 'google',
        })
    };

    return (
        <>
            <span className="continue-with">or continue with</span>
            <div className="social-login-buttons">
                <button className="social-button apple-button" onClick={() => handleLogin('apple')}>
                    <FontAwesomeIcon icon={faApple} />
                </button>
                <button className="social-button google-button" onClick={() => handleLogin()}>
                    <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button className="social-button facebook-button" onClick={() => handleLogin('facebook')}>
                    <FontAwesomeIcon icon={faFacebook} />
                </button>
            </div>
        </>
    );
};
console.log('Rendering SocialLoginModal Component');
export default SocialLoginModal;