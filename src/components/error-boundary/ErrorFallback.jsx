import PropTypes from 'prop-types';
import './ErrorFallback-style.css';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  console.log('ErrorFallback rendered with error:', error.message);
    return (
      <div role="alert" className='error-fallback-container'>
        <p>Something went wrong:</p>
        <div>{error.message}</div>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
};

ErrorFallback.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};

export default ErrorFallback;