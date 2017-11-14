import React from 'react';
import PropTypes from 'prop-types';

import styles from './button-wrap.css';

// PropTypes and defaultProps

const propTypes = {
  className: PropTypes.string,
};

const defaultProps = {
  className: '',
};

// Component

function ButtonWrap(props) {
  return <div {...props} className={`${props.className} ${styles.root}`} />;
}

ButtonWrap.propTypes = propTypes;
ButtonWrap.defaultProps = defaultProps;

export default ButtonWrap;
