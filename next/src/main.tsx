import { StrictMode } from 'react';

import '@fontsource-variable/open-sans';
import { createRoot } from 'react-dom/client';

import App from './App';
import './main.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
