import { useState } from 'react';

import PropTypes from 'prop-types';

import {
  isTooltipMarkdown,
  unwrapSelectionTooltip,
  wrapSelectionAsTooltip,
} from './vtl-tooltip-utils';

/**
 * Minimal replacement for the Draft.js "Link or Tooltip" toolbar removed with
 * gillespie59-react-rte (#1127). Works on Monaco selection via markdown
 * `[text](. "tooltip")`.
 */
const VtlTooltipToolbar = ({
  script = '',
  selection,
  disabled = false,
  onChange,
  labels = {},
}) => {
  const [draftTitle, setDraftTitle] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);

  const hasSelection = Boolean(selection?.text);
  const selectionIsTooltip = isTooltipMarkdown(selection?.text);

  const addLabel = labels.add || 'Link or Tooltip';
  const removeLabel = labels.remove || 'Remove Link or Tooltip';
  const placeholder = labels.placeholder || 'Insert an URL or a tooltip';

  const openPrompt = () => {
    if (disabled || !hasSelection || selectionIsTooltip) return;
    setDraftTitle('');
    setShowPrompt(true);
  };

  const applyTooltip = () => {
    const title = draftTitle.trim();
    if (!title || !hasSelection) return;
    onChange(wrapSelectionAsTooltip(script, selection, title));
    setShowPrompt(false);
    setDraftTitle('');
  };

  const removeTooltip = () => {
    if (disabled || !selectionIsTooltip) return;
    onChange(unwrapSelectionTooltip(script, selection));
    setShowPrompt(false);
  };

  return (
    <div className="ctrl-vtl-editor__toolbar">
      <button
        type="button"
        className="ctrl-vtl-editor__toolbar-button"
        disabled={disabled || !hasSelection || selectionIsTooltip}
        onClick={openPrompt}
        title={addLabel}
      >
        {addLabel}
      </button>
      <button
        type="button"
        className="ctrl-vtl-editor__toolbar-button"
        disabled={disabled || !selectionIsTooltip}
        onClick={removeTooltip}
        title={removeLabel}
      >
        {removeLabel}
      </button>
      {showPrompt && (
        <div className="ctrl-vtl-editor__toolbar-prompt">
          <input
            type="text"
            value={draftTitle}
            placeholder={placeholder}
            disabled={disabled}
            onChange={(e) => setDraftTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                applyTooltip();
              }
              if (e.key === 'Escape') {
                setShowPrompt(false);
              }
            }}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
          <button
            type="button"
            className="ctrl-vtl-editor__toolbar-button"
            disabled={disabled || !draftTitle.trim()}
            onClick={applyTooltip}
          >
            OK
          </button>
          <button
            type="button"
            className="ctrl-vtl-editor__toolbar-button"
            disabled={disabled}
            onClick={() => setShowPrompt(false)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

VtlTooltipToolbar.propTypes = {
  script: PropTypes.string,
  selection: PropTypes.shape({
    text: PropTypes.string,
    startLine: PropTypes.number,
    startColumn: PropTypes.number,
  }),
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    add: PropTypes.string,
    remove: PropTypes.string,
    placeholder: PropTypes.string,
  }),
};

export default VtlTooltipToolbar;
