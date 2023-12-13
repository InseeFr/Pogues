import React from 'react';

import VTLEditor from './vtl-editor';
import TextareaWithSuggestions from './textarea-with-suggestions';

import { FORMULA_LANGUAGE } from '../../../../constants/pogues-constants';

const { XPATH, VTL } = FORMULA_LANGUAGE;

const SimpleEditor = ({ formulasLanguage, ...props }) => {
  if (formulasLanguage === VTL) return <VTLEditor {...props} />;
  if (formulasLanguage === XPATH) return <TextareaWithSuggestions {...props} />;
  return null;
};

export default SimpleEditor;
