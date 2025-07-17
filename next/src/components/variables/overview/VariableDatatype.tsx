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
      return <div>{t('variable.datatype.boolean')}</div>;
    case DatatypeType.Date:
      return <div>{t('variable.datatype.date')}</div>;
    case DatatypeType.Duration:
      return <div>{t('variable.datatype.duration')}</div>;
    case DatatypeType.Numeric:
      return <div>{t('variable.datatype.numeric')}</div>;
    case DatatypeType.Text:
      return <div>{t('variable.datatype.text')}</div>;
  }
}
