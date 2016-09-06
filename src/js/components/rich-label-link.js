import React, { PropTypes } from 'react'
import { Entity, CompositeDecorator } from 'draft-js'

const styleLink = {
  color: '#3b5998',
  textDecoration: 'underline',
}

const styleInfo = {
  color: 'green',
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

export function createLinkEntity({ url, title }) {
  return Entity.create('LINK', 'IMMUTABLE', { url, title });
}

export default function Link({ entityKey, children }) {
  const { url, title } = Entity.get(entityKey).getData();
  const style = url !== '.' ? styleLink : styleInfo
  return (
    <span style={style}>
      {children}
    </span>
  );
};