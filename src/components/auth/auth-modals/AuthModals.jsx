import { useState } from 'react';
import PropTypes from 'prop-types';
import './AuthModals-style.css';
import { faAngleLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import YBlogo from '@assets/images/logo/YBlogo.png';
import LoginModal from './LoginModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import SignUpModal from './SignUpModal';

const AuthModals = ({ onClose }) => {
    const [modal, setModal] = useState('login'); // 'login', 'forgotPassword', 'signUp'
    const renderModalContent = () => {
        switch (modal) {
            case 'login':
                return <LoginModal setPopupType={setModal} onClose={onClose} />;
            case 'forgotPassword':
                return <ForgotPasswordModal setPopupType={setModal} onClose={onClose} />;
            case 'signUp':
                return <SignUpModal setPopupType={setModal} onClose={onClose} />;
            default:
                return null;
        }
    };

    return (
        <div className="overlay" onClick={onClose}>
            <div className="popup-form" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                <div className='popup-main-title'>
                        {modal !== 'login' ? (
                            <span className="previous-popup" onClick={() => setModal('login')}>
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </span>
                        ) : (
                            <span style={{ visibility: 'hidden', fontSize: '20px' }}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        )}
                        <img src={YBlogo} alt="Youngblood Logo" className="logo" />
                        <span className="close-popup" onClick={onClose}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </div>
                </div>
                {renderModalContent()}
            </div>
        </div>
    );
};

AuthModals.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default AuthModals;
