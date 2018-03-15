import React from 'react';
import PropTypes from 'prop-types';

// PropTypes and defaultProps

const propTypes = {
  contentState: PropTypes.object.isRequired,
  entityKey: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired
};

// Component

function RichTextareaCondition({ entityKey, children, contentState }) {
  const { condition } = contentState.getEntity(entityKey).getData();

  return (
    <span className="dotted" title={condition}>
      {children}
    </span>
  );
}

RichTextareaCondition.propTypes = propTypes;

export default RichTextareaCondition;
