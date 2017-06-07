import React from 'react';
import { Link } from 'react-router';
import logo from './logo-insee.png';
import UserConnection from 'components/user/user-connection';
import Dictionary from 'utils/dictionary/dictionary';

function Header() {
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
            <img alt="{Dictionary.homepage}" src={logo} />
          </dipv>
          <h2>
            <Link className="header-homepage" to="/">Pogues</Link>
          </h2>
          <h6>{Dictionary.headerSubtitle}</h6>
        </div>
        <div className="header-help">
          <Link to="/help">
            <span className="glyphicon glyphicon-question-sign" /><br />
            {Dictionary.HELP}
          </Link>
        </div>
        <div className="header-user">
          <UserConnection user={mockUser} />
        </div>
      </div>
    </nav>
  );
}

export default Header;
