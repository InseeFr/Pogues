// import { CompositeDecorator } from 'draft-js';
import RichTextareaCondition from './rich-textarea-condition';
import RichTextareaLink from './rich-textarea-link';

// Utils

export function findEntities(type) {
  return function findEntitiesCurried(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(character => {
      const entityKey = character.getEntity();
      if (entityKey != null) {
        const entity = contentState ? contentState.getEntity(entityKey) : null;
        return entity != null && entity.getType() === type;
      }
      return false;
    }, callback);
  };
}

// Decorators

export const customLinkDecorator = {
  strategy: findEntities('LINK'),
  component: RichTextareaLink,
};

export const customConditionDecorator = {
  strategy: findEntities('CONDITION'),
  component: RichTextareaCondition,
};

export default () => (
  <div style={{ color: 'red' }}>
    <b>ToDo </b>CompositeDecorator
  </div>
);

// export default new CompositeDecorator([
//   customLinkDecorator,
//   customConditionDecorator,
// ]);
