import React from 'react';
import PropTypes from 'prop-types';

// PropTypes and defaultProps

export const propTypes = {
  children: PropTypes.string.isRequired,
  highlight: PropTypes.string.isRequired,
};

// Component

function HighLighter({ children, highlight }) {
  const regex = new RegExp(highlight, 'g');
  // @TODO: Another way of avoid the html tags escape in jsx should be found.
  return <span dangerouslySetInnerHTML={{ __html: children.replace(regex, `<strong>${highlight}</strong>`) }} />;
}

HighLighter.propTypes = propTypes;

export default HighLighter;
