import React from 'react';

import { FORMULA_LANGUAGE } from '../../../../constants/pogues-constants';
import { toolbarConfig } from '../../rich-textarea';
import TextareaWithSuggestions from './textarea-with-suggestions';
import VTLEditor from './vtl-editor';

const { XPATH, VTL } = FORMULA_LANGUAGE;

/**
 * Label / declaration editors: free text + markdown tooltips (+ optional VTL).
 * Do not block VALIDER on VTL lexer/parser noise (antlr-editor ≥ 2.9.4 leftover
 * tokens would otherwise reject any multi-word French label).
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
