import MarkdownParser from './markdown-vtl-parser';
import { stateFromElement } from 'draft-js-import-element';

export default function stateFromMarkdown(markdown, options) {
  const element = MarkdownParser.parse(markdown, { getAST: true });
  return stateFromElement(element, options);
}
