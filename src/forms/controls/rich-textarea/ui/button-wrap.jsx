import React from 'react';
import PropTypes from 'prop-types';

import { BUTTON_WRAP } from '../../../../constants/dom-constants';

const { COMPONENT_CLASS } = BUTTON_WRAP;

// PropTypes and defaultProps

const propTypes = {
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

// Component

function ButtonWrap(props) {
  return <div {...props} className={`${props.className} ${COMPONENT_CLASS}`} />;
}

ButtonWrap.propTypes = propTypes;
ButtonWrap.defaultProps = defaultProps;

export default ButtonWrap;
