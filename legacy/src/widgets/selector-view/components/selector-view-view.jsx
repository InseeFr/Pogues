import React from 'react';

import PropTypes from 'prop-types';

// PropTypes and defaultProps

export const propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.element,
};

export const defaultProps = {
  children: undefined,
};

// Component

function SelectorViewView({ value, label, children }) {
  return (
    <div data-value={value} data-label={label}>
      {children}
    </div>
  );
}

SelectorViewView.propTypes = propTypes;
SelectorViewView.defaultProps = defaultProps;

export default SelectorViewView;
