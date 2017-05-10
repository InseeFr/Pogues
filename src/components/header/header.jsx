import React from 'react';
import logo from './logo-insee.png';
import UserConnection from 'components/user/user-connection';

function Header() {
  // @TODO: Remove this mock when a service is ready
  const mockUser = {
    name: 'Dupond-Martin .C',
    stamp: 'F302',
  };

  return (
    <nav id="header">
      <div className="header-brand">
        <div className="header-logo">
          <img alt="" src={logo} />
        </div>
        <h2>
          <a className="header-homepage" href="/">Pogues</a>
        </h2>
        <h6>Lorem ipsum dolor sit amet</h6>
      </div>
      <div className="header-help">
        <a href="/help">
          <span className="glyphicon glyphicon-question-sign" /><br />
          Aide
        </a>
      </div>
      <div className="header-user">
        <UserConnection user={mockUser} />
      </div>
    </nav>
  );
}

export default Header;
