import React from 'react';
import PropTypes from 'prop-types';

import defaultPicture from 'layout/user/components/user-picture-default.png';
import isEmpty from 'lodash.isempty';
import Dictionary from 'utils/dictionary/dictionary';

function UserConnection({ user }) {
  const isLogged = !isEmpty(user);

  return (
    <div id="user-connection">
      {isLogged ? (
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
            <div className="user-stamp">
              {Dictionary.stamp} {user.permission}
            </div>
          </div>
          {/* <div className="user-logout">
            <a>
              <span className="glyphicon glyphicon-remove-sign" />
              {Dictionary.logout}
            </a>
          </div>
        */}
        </div>
      ) : (
        <div className="user-login" />
      )}
    </div>
  );
}

UserConnection.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    permission: PropTypes.string,
    id: PropTypes.string,
    picture: PropTypes.string
  })
};

UserConnection.defaultProps = {
  user: {}
};

export default UserConnection;
