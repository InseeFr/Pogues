import { useOidc } from '../../utils/oidc';

const Comp = ({ Component, ...props }) => {
  const oidc = useOidc();
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
