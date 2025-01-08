import Header from './header/Header';
import Footer from './footer/Footer';
import PropTypes from 'prop-types';

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className='central-container'>
        {children}
      </div>
      <Footer />
    </>
  );
};
MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;