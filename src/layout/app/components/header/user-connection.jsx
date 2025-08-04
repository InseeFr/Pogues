import { useOidc } from '../../../../utils/oidc';
import defaultPicture from './user-picture-default.png';

function UserConnection() {
  const oidc = useOidc();
  const user = oidc.oidcTokens.decodedIdToken;

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
        </div>
      </div>
    </div>
  );
}

export default UserConnection;
