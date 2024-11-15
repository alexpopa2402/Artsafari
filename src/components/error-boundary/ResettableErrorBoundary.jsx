import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@components/error-boundary/ErrorFallback';

function ResettableErrorBoundary({ children }) {
  const location = useLocation();

  // Track the current location and reset the ErrorBoundary on route change
  useEffect(() => {
    // Reset logic is triggered by `key` prop change
  }, [location]);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.reload();
      }}
      resetKeys={[location.pathname]} // Resets the ErrorBoundary when path changes
    >
      {children}
    </ErrorBoundary>
  );
}
ResettableErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ResettableErrorBoundary;
