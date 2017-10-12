import React from 'react';
import PropTypes from 'prop-types';

// PropTypes and defaultProps

export const propTypes = {
  children: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
};

// Component

function HighLighter({ children, search }) {
  const regex = new RegExp(search, 'g');
  // @TODO: Another way of avoid the html tags escape in jsx should be found.
  return <span dangerouslySetInnerHTML={{ __html: children.replace(regex, `<strong>${search}</strong>`) }} />;
}

HighLighter.propTypes = propTypes;

export default HighLighter;
