/**
 * Pogues label tooltips use markdown:
 *   [visible text](. "tooltip content")
 * See docs/vtl/vtl-pogues-guide-fr.md and the user guide.
 */

const TOOLTIP_MARKDOWN =
  /^\[([\s\S]*?)\]\(\.\s*"((?:\\.|[^"\\])*)"\)$/;

/** 1-based Monaco line/column → UTF-16 offset. */
export function lineColumnToOffset(text, line, column) {
  if (line < 1) return 0;
  const lines = String(text).split('\n');
  if (line > lines.length) return String(text).length;

  let offset = 0;
  for (let i = 0; i < line - 1; i += 1) {
    offset += lines[i].length + 1;
  }
  const lineText = lines[line - 1] ?? '';
  const clampedColumn = Math.max(1, Math.min(column, lineText.length + 1));
  return offset + clampedColumn - 1;
}

export function escapeTooltipTitle(title = '') {
  return String(title).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

export function unescapeTooltipTitle(title = '') {
  return String(title).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
}

export function isTooltipMarkdown(text = '') {
  return TOOLTIP_MARKDOWN.test(String(text));
}

export function wrapSelectionAsTooltip(script = '', selection, title) {
  if (!selection?.text) return script;

  const start = lineColumnToOffset(
    script,
    selection.startLine,
    selection.startColumn,
  );
  const end = start + selection.text.length;
  const wrapped = `[${selection.text}](. "${escapeTooltipTitle(title)}")`;
  return `${script.slice(0, start)}${wrapped}${script.slice(end)}`;
}

export function unwrapSelectionTooltip(script = '', selection) {
  if (!selection?.text) return script;

  const match = String(selection.text).match(TOOLTIP_MARKDOWN);
  if (!match) return script;

  const start = lineColumnToOffset(
    script,
    selection.startLine,
    selection.startColumn,
  );
  const end = start + selection.text.length;
  return `${script.slice(0, start)}${match[1]}${script.slice(end)}`;
}
