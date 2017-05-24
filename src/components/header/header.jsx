import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import logo from './logo-insee.png';
import UserConnection from 'components/user/user-connection';

function Header({ locale }) {
  // @TODO: Remove this mock when a service is ready
  const mockUser = {
    name: 'Dupond-Martin .C',
    stamp: 'F302',
  };

  return (
    <nav id="header">
      <div id="header-wrapper">
        <div className="header-brand">
          <dipv className="header-logo">
            <img alt="{locale.homepage}" src={logo} />
          </dipv>
          <h2>
            <Link className="header-homepage" to="/">Pogues</Link>
          </h2>
          <h6>{locale.headerSubtitle}</h6>
        </div>
        <div className="header-help">
          <Link to="/help">
            <span className="glyphicon glyphicon-question-sign" /><br />
            {locale.HELP}
          </Link>
        </div>
        <div className="header-user">
          <UserConnection user={mockUser} locale={locale} />
        </div>
      </div>
    </nav>
  );
}

Header.propTypes = {
  locale: PropTypes.object.isRequired,
};

export default Header;
