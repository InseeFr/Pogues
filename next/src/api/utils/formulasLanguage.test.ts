import { FormulasLanguages } from '@/models/questionnaires';

import { FormulasLanguageEnum } from '../models/pogues';
import { computePoguesFormulasLanguage } from './formulasLanguage';

describe('computePoguesFormulasLanguage', () => {
  it.each([
    [FormulasLanguages.VTL, FormulasLanguageEnum.VTL],
    [FormulasLanguages.XPath, FormulasLanguageEnum.XPath],
  ])('%s -> %s', (input, expected) => {
    expect(computePoguesFormulasLanguage(input)).toEqual(expected);
  });

  it('works with default', () => {
    expect(computePoguesFormulasLanguage()).toEqual(FormulasLanguageEnum.VTL);
  });
});
