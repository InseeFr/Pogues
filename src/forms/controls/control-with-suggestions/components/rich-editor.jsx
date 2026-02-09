import React from 'react';

import { FORMULA_LANGUAGE } from '../../../../constants/pogues-constants';
import TextareaWithSuggestions from './textarea-with-suggestions';
import VTLEditor from './vtl-editor';

const { XPATH, VTL } = FORMULA_LANGUAGE;

const RichEditor = ({ formulasLanguage, ...props }) => {
  if (formulasLanguage === VTL) return <VTLEditor {...props} />;
  if (formulasLanguage === XPATH) return <TextareaWithSuggestions {...props} />;
  return null;
};

export default RichEditor;
