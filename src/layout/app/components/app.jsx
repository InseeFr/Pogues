import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from '../../header/header';
import Footer from '../../footer/footer';
import '../../../scss/pogues.scss';
import { APP } from '../../../constants/dom-constants';

const { COMPONENT_ID } = APP;

const App = ({ children, loadUnitsIfNeeded, token }) => {
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
  token: PropTypes.string,
  children: PropTypes.object.isRequired,
  loadUnitsIfNeeded: PropTypes.func.isRequired,
};

App.defaultProps = {
  token: '',
};

export default App;
