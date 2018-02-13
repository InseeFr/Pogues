import React from 'react';
import PropTypes from 'prop-types';

// PropTypes and defaultProps

const propTypes = {
  contentState: PropTypes.object.isRequired,
  entityKey: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired
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
