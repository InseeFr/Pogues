import React, { PropTypes } from 'react';
import classNames from 'classnames'
// active was passed to the component, but it doesn't seem to be used
function QuestionLabel({ label, highlighted, isDragging }) {
  const classes = classNames('question-header', highlighted && 'highlighted')
  return <h4 className={classes}>{label}</h4>
}

QuestionLabel.propTypes = {
  label: PropTypes.string.isRequired,
  highlighted: PropTypes.bool.isRequired,
  isDragging: PropTypes.bool.isRequired
}

export default QuestionLabel;
