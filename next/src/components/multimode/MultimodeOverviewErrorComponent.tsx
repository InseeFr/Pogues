import { type TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import { ErrorCodes, isPoguesAPIError } from '@/api/error';
import ErrorComponent from '@/components/layout/ErrorComponent';

function computeErrorMessage(error: Error, t: TFunction): string {
  if (
    isPoguesAPIError(error) &&
    error.response?.data.errorCode ===
      ErrorCodes.QuestionnaireFormulaLanguageNotVTL
  ) {
    return t('multimode.error.formulaNotVtl');
  }

  return error.message;
}

export default function MultimodeOverviewErrorComponent({
  error,
}: Readonly<{ error: Error }>) {
  const { t } = useTranslation();
  const errorMessage = computeErrorMessage(error, t);

  return <ErrorComponent error={errorMessage} />;
}
