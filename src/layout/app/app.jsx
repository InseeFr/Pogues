import { useEffect } from 'react';

import PropTypes from 'prop-types';

import '../../scss/pogues.scss';
import { useOidc } from '../../utils/oidc';
import Header from '../header/header';

const isOnlyLegacyApp =
  new URL(import.meta.url || '').origin === window.location.origin;

const App = ({ children, loadUnitsIfNeeded }) => {
  const oidc = useOidc();
  const token = oidc.oidcTokens.accessToken;
  useEffect(() => {
    loadUnitsIfNeeded(token);
  }, [token, loadUnitsIfNeeded]);

  return (
    <div id="pogues-legacy">
      {isOnlyLegacyApp && <Header />}
      {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object.isRequired,
  loadUnitsIfNeeded: PropTypes.func.isRequired,
};

export default App;
