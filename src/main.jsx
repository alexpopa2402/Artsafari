import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import './assets/styles/index.css';
import {ThemeProvider} from './context/ThemeContext';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
