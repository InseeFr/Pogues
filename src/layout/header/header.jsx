import { Link } from 'react-router-dom';

import Dictionary from '../../utils/dictionary/dictionary';
import { poguesFrontVersion } from '../../utils/version';
import UserConnection from '../user/user-connection';
import logo from './logo-insee.png';

function Header() {
  return (
    <nav id="header">
      <div id="header-wrapper">
        <div className="header-brand">
          <div className="header-logo">
            <img alt={Dictionary.homepage} src={logo} className="inline" />
          </div>
          <h2>
            <Link className="header-homepage" to="/">
              Pogues
            </Link>
          </h2>
          <h6>
            {Dictionary.headerSubtitle}
            <span className="pogues-version">
              <a
                href={`https://github.com/InseeFr/Pogues/releases/tag/${poguesFrontVersion}`}
                target="blank"
              >
                {poguesFrontVersion}
              </a>
            </span>
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
          <UserConnection />
        </div>
      </div>
    </nav>
  );
}

export default Header;
