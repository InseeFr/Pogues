import RichTextareaLink, { findLinkEntities } from './rich-textarea-link';
import RichTextareaVte, { findVteEntities } from './rich-textarea-vte';

export const customLinkDecorator = {
  strategy: findLinkEntities,
  component: RichTextareaLink,
};

export const customVteDecorator = {
  strategy: findVteEntities,
  component: RichTextareaVte,
};
