import { describe, expect, it } from 'vitest';

import {
  isTooltipMarkdown,
  unwrapSelectionTooltip,
  wrapSelectionAsTooltip,
} from './vtl-tooltip-utils';

describe('vtl-tooltip-utils', () => {
  it('wraps a selection as Pogues tooltip markdown', () => {
    const script = 'Mon libellé de question';
    const selection = {
      text: 'libellé',
      startLine: 1,
      startColumn: 5,
    };

    expect(wrapSelectionAsTooltip(script, selection, 'aide')).toBe(
      'Mon [libellé](. "aide") de question',
    );
  });

  it('escapes quotes in tooltip titles', () => {
    const script = 'abc';
    const selection = { text: 'b', startLine: 1, startColumn: 2 };

    expect(wrapSelectionAsTooltip(script, selection, 'say "hi"')).toBe(
      'a[b](. "say \\"hi\\"")c',
    );
  });

  it('unwraps a selected tooltip markdown', () => {
    const script = 'Mon [libellé](. "aide") de question';
    const selection = {
      text: '[libellé](. "aide")',
      startLine: 1,
      startColumn: 5,
    };

    expect(isTooltipMarkdown(selection.text)).toBe(true);
    expect(unwrapSelectionTooltip(script, selection)).toBe(
      'Mon libellé de question',
    );
  });

  it('leaves the script unchanged when there is no selection', () => {
    expect(wrapSelectionAsTooltip('abc', null, 'x')).toBe('abc');
    expect(unwrapSelectionTooltip('abc', { text: '' })).toBe('abc');
  });
});
