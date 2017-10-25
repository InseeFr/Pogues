import RichTextareaLink from './rich-textarea-link';
import { findLinkEntities } from './rich-textarea-utils';

export const customLinkDecorator = {
  strategy: findLinkEntities,
  component: RichTextareaLink,
};
