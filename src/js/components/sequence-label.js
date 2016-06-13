import React, { PropTypes } from 'react';
import classNames from 'classnames'

function SequenceLabel({ label, depth, highlighted }) {
  const Tag = 'h' + depth;
  const classes = classNames('sequence-header', highlighted && 'highlighted')
  return <Tag className={classes}>{label}</Tag>
}

SequenceLabel.propTypes = {
  label: PropTypes.string.isRequired,
  depth: PropTypes.number.isRequired,
  highlighted: PropTypes.bool.isRequired  
}

export default SequenceLabel;
