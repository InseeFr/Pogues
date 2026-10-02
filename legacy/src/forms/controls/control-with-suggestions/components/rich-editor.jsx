import React from 'react';

import { FORMULA_LANGUAGE } from '../../../../constants/pogues-constants';
import { toolbarConfig } from '../../rich-textarea';
import TextareaWithSuggestions from './textarea-with-suggestions';
import VTLEditor from './vtl-editor';

const { XPATH, VTL } = FORMULA_LANGUAGE;

/**
 * Label / declaration editors: free text + markdown tooltips (+ optional `$VAR$`).
 * Not strict VTL — do not block VALIDER / show parser noise on French labels.
 * Real VTL formulas use SimpleEditor (blockOnSyntaxErrors stays true).
 */
const RichEditor = ({
  formulasLanguage,
  toolbar = toolbarConfig,
  ...props
}) => {
  if (formulasLanguage === VTL) {
    return (
      <VTLEditor
        {...props}
        toolbar={toolbar}
        blockOnSyntaxErrors={false}
      />
    );
  }
  if (formulasLanguage === XPATH) {
    return <TextareaWithSuggestions {...props} />;
  }
  return null;
};

export default RichEditor;
