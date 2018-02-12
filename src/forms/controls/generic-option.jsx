import React from 'react';
import PropTypes from 'prop-types';

// PropTypes and defaultProps

export const propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  className: PropTypes.string
};

export const defaultProps = {
  className: undefined
};

// Component

function GenericOption({ value, children, className }) {
  return (
    <div data-value={value} className={className}>
      {children}
    </div>
  );
}

GenericOption.propTypes = propTypes;
GenericOption.defaultProps = defaultProps;

export default GenericOption;
