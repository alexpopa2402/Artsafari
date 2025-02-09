import React from 'react';
import './ButtonSpinner-style.css';

const Spinner: React.FC = () => {
  return (
    <div className="button-spinner-container">
      <div className="button-spinner"></div>
    </div>
  );
};

console.log('Rendering ButtonSpinner component');
export default Spinner;