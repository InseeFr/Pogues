import { useContext, useEffect } from 'react';

import PropTypes from 'prop-types';

import { AuthContext } from '@/auth/context';

import '../../scss/pogues.scss';

const App = ({ children, loadUnitsIfNeeded }) => {
  const { getAccessToken } = useContext(AuthContext);
  useEffect(() => {
    const load = async () => {
      const accessToken = await getAccessToken();
      loadUnitsIfNeeded(accessToken);
    };
    load();
  }, [getAccessToken, loadUnitsIfNeeded]);

  return <div id="pogues-legacy">{children}</div>;
};

App.propTypes = {
  children: PropTypes.object.isRequired,
  loadUnitsIfNeeded: PropTypes.func.isRequired,
};

export default App;
