import React from 'react';
import PropTypes from 'prop-types';

import { WIDGET_ERRORS_PANEL } from 'constants/dom-constants';

const { COMPONENT_CLASS } = WIDGET_ERRORS_PANEL;

// PropTypes and defaultProps

const propTypes = {
  errors: PropTypes.array,
};

const defaultProps = {
  errors: [],
};

// Component

function ErrrosPanel({ errors }) {
  return <div className={COMPONENT_CLASS} />;
}

ErrrosPanel.propTypes = propTypes;
ErrrosPanel.defaultProps = defaultProps;

export default ErrrosPanel;
