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
      return <div>{t('variable.type.collected')}</div>;
    case Type.Calculated:
      return <div>{t('variable.type.calculated')}</div>;
    case Type.External:
      return <div>{t('variable.type.external')}</div>;
  }
}
