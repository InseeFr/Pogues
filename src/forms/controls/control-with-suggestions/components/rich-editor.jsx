import React from 'react';

import { FORMULA_LANGUAGE } from '../../../../constants/pogues-constants';
import RichTextareaWithSuggestions from './rich-textarea-with-suggestions';
import VTLEditor from './vtl-editor';

const { XPATH, VTL } = FORMULA_LANGUAGE;

const RichEditor = ({ formulasLanguage, ...props }) => {
  if (formulasLanguage === VTL) return <VTLEditor {...props} />;
  if (formulasLanguage === XPATH)
    return <RichTextareaWithSuggestions {...props} />;
  return null;
};

export default RichEditor;
