import { useTranslation } from 'react-i18next';

import { VariableType as Type } from '@/models/variables';

interface Props {
  type: Type;
}

/** Display the type of a variable (i.e. collected, calculated or external). */
export default function VariableType({ type }: Readonly<Props>) {
  const { t } = useTranslation();

  switch (type) {
    case Type.Collected:
      return t('variable.type.collected');
    case Type.Calculated:
      return t('variable.type.calculated');
    case Type.External:
      return t('variable.type.external');
  }
}
