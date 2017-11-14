import MarkdownParser from './markdown-vtl-parser';
import { stateFromElement } from 'draft-js-import-element';

export default function stateFromMarkdown(markdown, options) {
  const elementMarkdown = MarkdownParser.parse(markdown, { getAST: true });

  return stateFromElement(elementMarkdown, {
    customInlineFn: (element, { Style, Entity }) => {
      const className = element.getAttribute('className');
      if (element.tagName === 'SPAN' && className === 'condition') {
        return Entity('CONDITION', { conditions: JSON.parse(element.getAttribute('conditions')) });
      }
    },
  });
}
