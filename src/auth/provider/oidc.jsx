import { useEffect, useState } from 'react';
import Loader from '../../layout/loader';
import { createOidcProvider } from 'oidc-spa/react';

const AuthProviderOIDC = ({ children }) => {
  const [conf, setConf] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${window.location.origin}/oidc.json`)
      .then(r => r.json())
      .then(r => {
        setConf(r);
        setLoading(false);
      });
  }, []);

  if (!loading && conf.config) {
    const { OidcProvider } = createOidcProvider({
      issuerUri: `${conf.config.authority}`,
      clientId: conf.config.client_id,
      // See above for other parameters
    });
    return <OidcProvider fallback={<Loader />}>{children}</OidcProvider>;
  }
  return <Loader />;
};

export default AuthProviderOIDC;
