import decorators from '../decorators/rich-textarea-decorators';

import stateToMarkdownVtl from '../lib/state-to-markdown-vtl';

export function removeVtlFromMarkdow(markdownVtl) {
  return markdownVtl.replace(/##{"label":\s*"(.+?)".+#end/g, '$1');
}

export function createFromMarkdownVtl(/* markdownVtl, format, decorator */) {
  // const contentState = stateFromMarkdownVtl(markdownVtl);
  // const editorState = EditorState.createWithContent(contentState, decorator);
  return <div style={{ color: 'red' }}>EditorValue</div>;
  // return new EditorValue(editorState, { [format]: markdownVtl });
}

export function contentStateToString(contentState) {
  return stateToMarkdownVtl(contentState).replace(/(^\n+)|(\n+$)/, '');
}

export function getEditorValue(markdownVtl) {
  return markdownVtl ? (
    createFromMarkdownVtl(markdownVtl, 'markdown', decorators)
  ) : (
    <div style={{ color: 'red' }}>
      <b>ToDo</b>EditorValue
    </div>
  );
}

export function markdownVtlToHtml(markdownVtl) {
  const markdown = removeVtlFromMarkdow(markdownVtl);
  return createFromMarkdownVtl(markdown, 'markdown', decorators).toString(
    'html',
  );
}

export function markdownVtlToString(markdownVtl) {
  const markdown = removeVtlFromMarkdow(markdownVtl);
  const raw = createFromMarkdownVtl(markdown, 'markdown', decorators).toString(
    'raw',
  );
  return JSON.parse(raw).blocks[0].text.replace(/(^\n+)|(\n+$)/, '');
}

/**
 * We do not format in the same way external URL and tooltip.
 * If the url start with http(s), we format as a basic link.
 * If not, we will use the string '.' as the URL.
 *
 * @param {*} url the URL of a markdown link
 */
export function formatURL(url) {
  if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
    return { url };
  }
  return { url: '.', title: url };
}
