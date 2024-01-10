import React from 'react';
import { Link } from 'react-router-dom';

import logo from 'layout/header/logo-insee.png';
import UserConnectionContainer from 'layout/user/user-connection-container';
import Dictionary from 'utils/dictionary/dictionary';
import { poguesFrontVersion } from 'utils/version';

function Header() {
  return (
    <nav id="header">
      <div id="header-wrapper">
        <div className="header-brand">
          <div className="header-logo">
            <img alt="{Dictionary.homepage}" src={logo} />
          </div>
          <h2>
            <Link className="header-homepage" to="/">
              Pogues
            </Link>
          </h2>
          <h6>
            {Dictionary.headerSubtitle}
            <span className="pogues-version">{poguesFrontVersion}</span>
          </h6>
        </div>
        <div className="header-help">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={Dictionary.helpUrl}
          >
            <span className="glyphicon glyphicon-question-sign" />
            <br />
            {Dictionary.HELP}
          </a>
        </div>
        <div className="header-user">
          <UserConnectionContainer />
        </div>
      </div>
    </nav>
  );
}

export default Header;
