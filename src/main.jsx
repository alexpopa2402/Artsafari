import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient  from './queryClient.js';
import { supabase } from '@services/supabaseClient.tsx'

import App from './App.jsx';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </QueryClientProvider>
    </SessionContextProvider>
  </React.StrictMode>
);
