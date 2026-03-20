import ReactDOM from 'react-dom/client';

import { secure } from './auth';
import { getAccessToken, useOidc } from './lib/auth/oidc';
import { Main } from './main';

const App = () => {
  const { decodedIdToken } = useOidc();
  return (
    <Main getAccessToken={getAccessToken} decodedIdToken={decodedIdToken} />
  );
};

const AppSecure = (props) => secure(App)(props);

ReactDOM.createRoot(document.getElementById('root')).render(<AppSecure />);
