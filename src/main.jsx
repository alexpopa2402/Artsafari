import React from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from '@services/supabaseClient.jsx';

import App from './App.jsx';



const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </SessionContextProvider>
  </React.StrictMode>
);
