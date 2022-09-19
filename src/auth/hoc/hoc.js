import React from 'react';
import Container from './container';

const secure = Component =>
  function (props) {
    return <Container Component={Component} {...props} />;
  };

export default secure;
