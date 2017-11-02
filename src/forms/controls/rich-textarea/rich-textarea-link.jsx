import React from 'react';
import PropTypes from 'prop-types';

// Utils

export function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    if (entityKey != null) {
      const entity = contentState ? contentState.getEntity(entityKey) : null;
      return entity != null && entity.getType() === 'LINK';
    }
    return false;
  }, callback);
}

// PropTypes and defaultProps

const propTypes = {
  contentState: PropTypes.func.isRequired,
  entityKey: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

// Component

function RichTextareaLink({ entityKey, children, contentState }) {
  const { url, title } = contentState.getEntity(entityKey).getData();

  return (
    <a href={url} title={title}>
      {children}
    </a>
  );
}

RichTextareaLink.propTypes = propTypes;

export default RichTextareaLink;
