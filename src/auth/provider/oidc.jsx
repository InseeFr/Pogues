import React, { useState, useEffect } from 'react';
import { Oidc, InMemoryWebStorage } from '@axa-fr/react-oidc-redux';
import Loader from 'layout/loader';
import { buildOidcConfiguration } from 'utils/oidc/build-configuration';

const AuthProviderOIDC = ({ store, children }) => {
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

  if (loading) return <Loader />;
  return (
    <Oidc
      store={store}
      configuration={buildOidcConfiguration(conf).config}
      isEnabled={conf.isEnabled}
      UserStore={InMemoryWebStorage}
      callbackComponentOverride={Loader}
      // authenticating props unavailable for now in axa redux package
      authenticating={Loader}
      sessionLostComponent={Loader}
    >
      {children}
    </Oidc>
  );
};

export default AuthProviderOIDC;
