import Header from './header/Header';
import Footer from './footer/Footer';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isUploadPage = location.pathname === '/upload-artwork';
  return (
    <>
      {!isUploadPage && <Header />}
      <div className={`central-container ${isUploadPage ? 'no-margin' : ''}`}>
        {children}
      </div>
      {!isUploadPage && <Footer />}
    </>
  );
};
MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;