import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from '../../header/header';
import Footer from '../../footer/footer';
import { useAuth } from '../../../utils/oidc/useAuth';
import '../../../scss/pogues.scss';

import { APP } from '../../../constants/dom-constants';

const { COMPONENT_ID } = APP;

const App = ({ children, loadUnitsIfNeeded, authType }) => {
  const { oidc } = useAuth(authType);
  const token = oidc.getTokens().accessToken;

  useEffect(() => {
    loadUnitsIfNeeded(token);
  }, [token, loadUnitsIfNeeded]);

  return (
    <div id={COMPONENT_ID}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

App.propTypes = {
  authType: PropTypes.string,
  children: PropTypes.object.isRequired,
  loadUnitsIfNeeded: PropTypes.func.isRequired,
};

App.defaultProps = {
  authType: '',
};

export default App;
