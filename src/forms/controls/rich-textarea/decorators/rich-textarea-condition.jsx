import React from 'react';
import PropTypes from 'prop-types';

// Utils

export function findConditionEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    if (entityKey != null) {
      const entity = contentState ? contentState.getEntity(entityKey) : null;
      return entity != null && entity.getType() === 'CONDITION';
    }
    return false;
  }, callback);
}

// PropTypes and defaultProps

const propTypes = {
  contentState: PropTypes.object.isRequired,
  entityKey: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
};

// Component

function RichTextareaCondition({ entityKey, children, contentState }) {
  const data = contentState.getEntity(entityKey).getData();

  return (
    <span className="dotted" title={data.condition}>
      {children}
    </span>
  );
}

RichTextareaCondition.propTypes = propTypes;

export default RichTextareaCondition;
