import { useOidc } from '@/lib/auth/oidc';

const Comp = ({ Component, ...props }) => {
  const { isUserLoggedIn, login } = useOidc();
  const ReturnedComponent = <Component {...props} />;
  if (isUserLoggedIn) {
    return ReturnedComponent;
  }
  login();

  return null;
};

export default Comp;
