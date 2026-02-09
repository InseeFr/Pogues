import stateFromMarkdownVtl from '../lib/state-from-markdown-vtl';

export function removeVtlFromMarkdown(markdownVtl) {
  return markdownVtl.replace(/##{"label":\s*"(.+?)".+#end/g, '$1');
}

export function markdownVtlToString(markdownVtl) {
  const markdown = removeVtlFromMarkdown(markdownVtl);
  const contentState = stateFromMarkdownVtl(markdown);
  const firstBlock = contentState.getBlockMap().first();
  if (!firstBlock) {
    return '';
  }
  return firstBlock.getText().replace(/(^\n+)|(\n+$)/, '');
}
