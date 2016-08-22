import React, { PropTypes } from 'react'
import { Entity, CompositeDecorator } from 'draft-js'


export const IconDecorator = new CompositeDecorator([{
  strategy: findIconEntities,
  component: Icon,
}])

export function findIconEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'ICON'
      );
    },
    callback
  );
}

export function createIconEntity(info) {
  return Entity.create('ICON', 'IMMUTABLE', { info });
}

export default function Icon({ entityKey, children }) {
  const { info } = Entity.get(entityKey).getData();
  return (
    <span className="fa fa-question-circle" alt={info}>
    </span>
  );
};