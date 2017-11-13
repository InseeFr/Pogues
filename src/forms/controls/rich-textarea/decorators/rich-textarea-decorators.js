import RichTextareaLink, { findLinkEntities } from './rich-textarea-link';
import RichTextareaCondition, { findConditionEntities } from './rich-textarea-condition';

export const customLinkDecorator = {
  strategy: findLinkEntities,
  component: RichTextareaLink,
};

export const customConditionDecorator = {
  strategy: findConditionEntities,
  component: RichTextareaCondition,
};
