import RichTextEditor from 'gillespie59-react-rte/lib/RichTextEditor';
import { CompositeDecorator, EditorState } from 'draft-js';
import stateToMarkdownVtl from './lib/state-to-markdown-vtl';
import stateFromMarkdownVtl from './lib/state-from-markdown-vtl';
import { stateFromElement } from 'draft-js-import-element';

import { customLinkDecorator, customConditionDecorator } from './decorators/rich-textarea-decorators';

const MARKDOWN = 'markdown';
const RAW = 'raw';

export function getDecorators() {
  return new CompositeDecorator([customLinkDecorator, customConditionDecorator]);
}

export function markdownToHtml(markdownVtl) {
  const markdown = markdownVtl.replace(/(##{"label": "(.+)", .+#end)/g, '$2');
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

export function editorValueToMarkdown(editorState) {
  return stateToMarkdownVtl(editorState).replace(/^\n+|\n+$/, '');
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

function createFromString(markup, format, decorator) {
  const contentState = stateFromMarkdownVtl(markup);
  const editorState = EditorState.createWithContent(contentState, decorator);
  return new RichTextEditor.EditorValue(editorState, { [format]: markup });
}

export function getValue(value) {
  const decorators = getDecorators();
  const editorValue = value
    ? RichTextEditor.EditorValue.createFromString(value, MARKDOWN, decorators)
    : RichTextEditor.EditorValue.createEmpty(decorators);

  const contentState = editorValue.getEditorState().getCurrentContent();

  return editorValue;

  // return value ? createFromString(value, MARKDOWN, decorators) : RichTextEditor.EditorValue.createEmpty(decorators);
}
