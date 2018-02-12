import React from 'react';
import PropTypes from 'prop-types';

// PropTypes and defaultProps

export const propTypes = {
  children: PropTypes.string.isRequired,
  highlight: PropTypes.string.isRequired,
  caseSensitive: PropTypes.bool
};

export const defaultProps = {
  caseSensitive: true
};

// Component

function HighLighter({ children, highlight, caseSensitive }) {
  const flags = caseSensitive ? 'g' : 'gi';
  const regex = new RegExp(highlight, flags);

  // @TODO: Another way of avoid the html tags escape in jsx should be found.
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: children.replace(regex, str => `<strong>${str}</strong>`)
      }}
    />
  );
}

HighLighter.propTypes = propTypes;
HighLighter.defaultProps = defaultProps;

export default HighLighter;
