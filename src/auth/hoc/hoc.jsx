import React from 'react';
import Comp from './component';

const secure = Component => props => <Comp Component={Component} {...props} />;

export default secure;
