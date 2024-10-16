import { useState } from 'react';
import './LoginRegisterButton-style.css';
import LoginRegisterCard from '../LoginRegisterCard/LoginRegisterCard';

const LoginRegisterButton = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleButtonClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div>
            <button className="login-button" onClick={handleButtonClick}>
                Log in / Sign up
            </button>
            {showPopup && <LoginRegisterCard onClose={handleClosePopup} />}
        </div>
    );
};

export default LoginRegisterButton;