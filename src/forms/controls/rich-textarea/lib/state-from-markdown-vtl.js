import MarkdownParser from './markdown-vtl-parser';
import { stateFromElement } from 'draft-js-import-element';

export default function stateFromMarkdown(markdown) {
  const elementMarkdown = MarkdownParser.parse(markdown, { getAST: true });

  return stateFromElement(elementMarkdown, {
    customInlineFn: (element, { Entity }) => {
      const className = element.getAttribute('className');
      let condition;
      if (element.tagName === 'SPAN' && className === 'condition') {
        condition = Entity('CONDITION', { conditions: JSON.parse(element.getAttribute('conditions')) });
      }

      return condition;
    },
  });
}
