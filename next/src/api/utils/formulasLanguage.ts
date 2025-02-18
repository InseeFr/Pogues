import { FormulasLanguages } from '@/models/questionnaires';

import { FormulasLanguageEnum } from '../models/pogues';

export function computePoguesFormulasLanguage(
  formulasLanguage?: FormulasLanguages,
): FormulasLanguageEnum {
  switch (formulasLanguage) {
    case FormulasLanguages.XPath:
      return FormulasLanguageEnum.XPath;
    case FormulasLanguages.VTL:
    default:
      return FormulasLanguageEnum.VTL;
  }
}
