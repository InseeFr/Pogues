import React from 'react';
import Header from 'components/header/header';
import Footer from 'components/footer/footer';
import HomePage from 'components/homepage/homepage';

import 'scss/pogues.scss';

const App = () => {
  return (
    <div id="app">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
};

export default App;
