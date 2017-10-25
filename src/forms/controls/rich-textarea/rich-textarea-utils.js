import RichTextEditor from 'gillespie59-react-rte/lib/RichTextEditor';
import { CompositeDecorator } from 'draft-js';

import { customLinkDecorator } from './rich-textarea-decorators';

const MARKDOWN = 'markdown';
const RAW = 'raw';

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

export function getDecorators() {
  return new CompositeDecorator([customLinkDecorator]);
}

export function markdownToHtml(markdown) {
  const decorators = getDecorators();
  return { __html: RichTextEditor.EditorValue.createFromString(markdown, MARKDOWN, decorators).toString('html') };
}

export function markdownToEditorValue(markdown) {
  const decorators = getDecorators();
  try {
    return RichTextEditor.EditorValue.createFromString(markdown, MARKDOWN, decorators);
  } catch (e) {
    return RichTextEditor.EditorValue.createEmpty(decorators);
  }
}

export function editorValueToMarkdown(value) {
  return value.toString(MARKDOWN).replace(/(\n|\r)$/, '');
}

export function editorValueToRaw(value) {
  return value.toString(RAW);
}

export function markdownToRaw(value) {
  return JSON.parse(markdownToEditorValue(value).toString(RAW));
}

export function formatURL(url) {
  if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
    return { url };
  }
  return { url: '.', title: url };
}

export function getValue(value) {
  const decorators = getDecorators();
  return value
    ? RichTextEditor.EditorValue.createFromString(value, MARKDOWN, decorators)
    : RichTextEditor.EditorValue.createEmpty(decorators);
}
