import { connect } from 'react-redux';
import App from '../components/app';
import { loadUnitsIfNeeded } from '../../../actions/metadata';
import { useAuth } from '../../../utils/oidc/useAuth';

const mapStateToProps = ({ authType }) => {
  const { oidc } = useAuth(authType);
  const token = oidc.getTokens().accessToken;

  return {
    token: token,
  };
};

const mapDispatchToProps = {
  loadUnitsIfNeeded,
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
