import PropTypes from 'prop-types';

import { useUser } from '../../../utils/oidc/useAuth';
import defaultPicture from './user-picture-default.png';

function UserConnection({ authType }) {
  const { user } = useUser(authType);

  const hasName = user?.name;
  if (!hasName) return null;
  return (
    <div id="user-connection">
      <div>
        <div className="user">
          {user.picture ? (
            <div className="user-picture">
              <img alt="" src={user.picture} />
            </div>
          ) : (
            <div className="user-picture">
              <img alt="" className="default-picture" src={defaultPicture} />
            </div>
          )}
          <div className="user-name">
            <strong>{user.name}</strong>
          </div>
          {/* <div className="user-stamp">
              {Dictionary.stamp} {user.stamp}
            </div> */}
        </div>
        {/* <div className="user-logout">
            <a>
              <span className="glyphicon glyphicon-remove-sign" />
              {Dictionary.logout}
            </a>
          </div>
        */}
      </div>
    </div>
  );
}

UserConnection.propTypes = {
  authType: PropTypes.string,
};

UserConnection.defaultProps = {
  authType: undefined,
};

export default UserConnection;
