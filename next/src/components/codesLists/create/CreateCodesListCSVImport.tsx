import { useTranslation } from 'react-i18next';

import Button from '@/components/ui/Button';

/** Allow to import a CSV which will create a codes list. */
export default function CreateCodesListCSVImport() {
  const { t } = useTranslation();

  return <Button>{t('codesList.create.importCSV')}</Button>;
}
