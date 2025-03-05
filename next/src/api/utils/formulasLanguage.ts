import { FormulasLanguages } from '@/models/questionnaires';

import { FormulasLanguageEnum } from '../models/pogues';

export function computeFormulasLanguage(
  formulasLanguage?: FormulasLanguageEnum,
): FormulasLanguages {
  switch (formulasLanguage) {
    case FormulasLanguageEnum.XPath:
      return FormulasLanguages.XPath;
    case FormulasLanguageEnum.VTL:
    default:
      return FormulasLanguages.VTL;
  }
}

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
