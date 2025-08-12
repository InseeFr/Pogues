import { useTranslation } from 'react-i18next';

import { DatatypeType } from '@/models/datatype';

interface Props {
  datatype: DatatypeType;
}

/** Display the datatype of a variable (e.g. text, boolean...). */
export default function VariableDatatype({ datatype }: Readonly<Props>) {
  const { t } = useTranslation();

  switch (datatype) {
    case DatatypeType.Boolean:
      return t('variable.datatype.boolean');
    case DatatypeType.Date:
      return t('variable.datatype.date');
    case DatatypeType.Duration:
      return t('variable.datatype.duration');
    case DatatypeType.Numeric:
      return t('variable.datatype.numeric');
    case DatatypeType.Text:
      return t('variable.datatype.text');
  }
}
