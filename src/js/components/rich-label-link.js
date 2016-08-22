import React, { PropTypes } from 'react'
import { Entity, CompositeDecorator } from 'draft-js'

const style = {
  color: '#3b5998',
  textDecoration: 'underline',
}

export const LinkDecorator = new CompositeDecorator([{
  strategy: findLinkEntities,
  component: Link,
}])

export function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

export function createLinkEntity(url) {
  return Entity.create('LINK', 'IMMUTABLE', { url });
}

export default function Link({ entityKey, children }) {
  const { url } = Entity.get(entityKey).getData();
  return (
    <a href={url} style={style}>
      {children}
    </a>
  );
};