import { useAuth } from '../../utils/oidc/useAuth';

// export default secure;

const Comp = ({ Component, ...props }) => {
  const { oidc } = useAuth();
  const { isUserLoggedIn, login } = oidc;
  const ReturnedComponent = <Component {...props} />;
  if (isUserLoggedIn) {
    return ReturnedComponent;
  }
  login({
    doesCurrentHrefRequiresAuth: true,
  });
  return null;
};

export default Comp;
