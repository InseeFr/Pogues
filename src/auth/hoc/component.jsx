import React from 'react';
import { OidcSecure } from '@axa-fr/react-oidc-redux';

const Comp = ({ Component, ...props }) => {
  const { authType, ...otherProps } = props;
  const ReturnedComponent = <Component {...otherProps} />;
  if (authType === 'NONE') return ReturnedComponent;
  if (authType === 'OIDC') return <OidcSecure>{ReturnedComponent}</OidcSecure>;
  return <div>{`Auth type ${authType} is nor recognized`}</div>;
};

export default Comp;
