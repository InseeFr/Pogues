import { TABS_PATHS } from '@/constants/pogues-constants';
import Dictionary from '@/utils/dictionary/dictionary';

import { cartCodeModeCollecte, required } from '../validate-rules';

const { DECLARATIONS } = TABS_PATHS;

export const declarationRules = {
  [`${DECLARATIONS}.label`]: [
    (value?: string | number) =>
      required(value) && Dictionary.validation_declaration_label,
  ],
  [`${DECLARATIONS}.declarationType`]: [
    (value: string, conf: { form: { declarations: { TargetMode: string } } }) =>
      cartCodeModeCollecte(value, conf) && Dictionary.validation_card_code,
  ],
};
