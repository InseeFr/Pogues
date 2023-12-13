import React from 'react';
import PropTypes from 'prop-types';

import defaultPicture from './user-picture-default.png';

function UserConnection({ user }) {
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
  user: PropTypes.shape({
    name: PropTypes.string,
    stamp: PropTypes.string,
    id: PropTypes.string,
    picture: PropTypes.string,
  }),
};

UserConnection.defaultProps = {
  user: {},
};

export default UserConnection;
