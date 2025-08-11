import { useTranslation } from 'react-i18next';

import Popover from '@/components/ui/Popover';
import { VariableType as Type } from '@/models/variables';

interface Props {
  formula?: string;
  type: Type;
}

/** Display the type of a variable (i.e. collected, calculated or external). */
export default function VariableType({ formula, type }: Readonly<Props>) {
  const { t } = useTranslation();

  switch (type) {
    case Type.Collected:
      return t('variable.type.collected');
    case Type.Calculated:
      return (
        <Popover description={formula}>
          <div className="min-w-28">{t('variable.type.calculated')}</div>
        </Popover>
      );
    case Type.External:
      return t('variable.type.external');
  }
}
