import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from '../../header/header';
import Footer from '../../footer/footer';
import '../../../scss/pogues.scss';
import { APP } from '../../../constants/dom-constants';
import { useOidc } from '../../../utils/oidc';

const { COMPONENT_ID } = APP;

const App = ({ children, loadUnitsIfNeeded }) => {
  const oidc = useOidc();
  const token = oidc.oidcTokens.accessToken;
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
  children: PropTypes.object.isRequired,
  loadUnitsIfNeeded: PropTypes.func.isRequired,
};

export default App;
