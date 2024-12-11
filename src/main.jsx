import React from 'react';
import App from './App.jsx';
import './assets/styles/index.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <Router>
          <App />
        </Router>
  </React.StrictMode>
);
