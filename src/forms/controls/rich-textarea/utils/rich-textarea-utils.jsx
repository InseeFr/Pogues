import MarkdownParser from '../lib/markdown-vtl-parser';
import stateFromMarkdownVtl from '../lib/state-from-markdown-vtl';

export function removeVtlFromMarkdown(markdownVtl) {
  return markdownVtl.replace(/##{"label":\s*"(.+?)".+#end/g, '$1');
}

export function markdownVtlToHtml(markdownVtl) {
  const markdown = removeVtlFromMarkdown(markdownVtl);
  if (!markdown) {
    return '';
  }
  return MarkdownParser.parse(markdown, { getAST: true });
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
