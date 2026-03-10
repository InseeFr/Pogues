import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';

import { Main } from './main';
import { getAccessToken } from './utils/oidc';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main getAccessToken={getAccessToken} />
  </StrictMode>,
);
