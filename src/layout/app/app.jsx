import { useEffect } from 'react';

import PropTypes from 'prop-types';

import '../../scss/pogues.scss';
import { useOidc } from '../../utils/oidc';

const App = ({ children, loadUnitsIfNeeded }) => {
  const oidc = useOidc();
  const token = oidc.oidcTokens.accessToken;
  useEffect(() => {
    loadUnitsIfNeeded(token);
  }, [token, loadUnitsIfNeeded]);

  return <div id="pogues-legacy">{children}</div>;
};

App.propTypes = {
  children: PropTypes.object.isRequired,
  loadUnitsIfNeeded: PropTypes.func.isRequired,
};

export default App;
