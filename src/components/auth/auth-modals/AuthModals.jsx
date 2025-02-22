import { useState, useRef, lazy, Suspense  } from 'react';
import { faAngleLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './AuthModals-style.css';

import PropTypes from 'prop-types';

import useFocusTrap from '@hooks/useFocusTrap';

import YBlogo from '@assets/images/logo/YBlogo.png';
import Spinner from '@components/loaders/spinners/SpinnerGlobal/Spinner';

// lazy loading components to avoid blocking the main thread during initial render.
const LoginModal = lazy(() => import('./LoginModal'));
const ForgotPasswordModal = lazy(() => import('./ForgotPasswordModal'));
const SignUpModal = lazy(() => import('./SignUpModal'));
const TermsText = lazy(() => import('./TermsText'));
const ThankYouMessage = lazy(() => import('./ThankYouMessage'));

const AuthModals = ({ onClose }) => { // onClose is a function that closes the modal. It is passed as a prop from the AuthButton parent component. */
    const [modal, setModal] = useState('login'); // 'login', 'forgotPassword', 'signUp'
    const modalRef = useRef(null); // useRef is used to create a reference to the popup-form modal element, so that we can trap focus inside it when it is open.
    const [showThankYouMessage, setShowThankYouMessage] = useState(false);

    useFocusTrap(modalRef, modal);

    const renderModalContent = () => {
        
        if (showThankYouMessage) { // after successfull signup the showThankYouMessage is set to true, as to render ThankYouMessage component.
            return <ThankYouMessage onClose={onClose} />;
        }
        
        switch (modal) {
            case 'login':
                return (
                    <>
                        <LoginModal setPopupType={setModal} onClose={onClose} />
                        <TermsText />
                    </>
                );
            case 'forgotPassword':
                return <ForgotPasswordModal setPopupType={setModal} onClose={onClose} />;
            case 'signUp':
                return (
                    <>
                        <SignUpModal setPopupType={setModal} onClose={onClose} setShowThankYouMessage={setShowThankYouMessage} />
                        <TermsText />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="overlay" onClick={onClose}>
            <div className="popup-form" onClick={(e) => e.stopPropagation()} ref={modalRef}>
            <Suspense fallback={<Spinner />}>
                <div className="popup-header">
                    <div className='popup-main-title'>
                        {modal !== 'login' ? ( // this is not the login modal, so we show the back button.
                            <button className="previous-popup" onClick={() => setModal('login')}>
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </button>
                        ) : ( // this is the login modal, so we hide the back button, which is still added to keep the same layout width for all modals.
                            <span style={{ visibility: 'hidden', fontSize: '20px' }}>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                        )}
                        <img src={YBlogo} alt="Youngblood Logo" className="logo" />
                        <button className="close-popup" onClick={onClose} aria-label="Close">
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                </div>
                    {renderModalContent()}
                </Suspense>
            </div>
        </div>
    );
};

AuthModals.propTypes = {
    onClose: PropTypes.func.isRequired,
};

console.log('Rendering AuthModals Component');
export default AuthModals;