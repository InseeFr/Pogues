import React from 'react';
import Container from './container';

const secure = Component => props =>
  <Container Component={Component} {...props} />;

export default secure;
