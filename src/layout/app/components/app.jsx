import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from 'layout/header/header';
import Footer from 'layout/footer/footer';

//TODO
//import 'scss/pogues.scss';

import { APP } from 'constants/dom-constants';

const { COMPONENT_ID } = APP;

// Component
const App = props => {
  useEffect(() => {
    props.loadUser();
    props.loadUnitsIfNeeded();
  }, []);

  return (
    <div id={COMPONENT_ID}>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};
// Prop types and default props

App.propTypes = {
  children: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  loadUnitsIfNeeded: PropTypes.func.isRequired,
};
export default App;
