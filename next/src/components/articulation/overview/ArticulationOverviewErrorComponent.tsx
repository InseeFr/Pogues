import { type TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import { ErrorCodes, isPoguesAPIError } from '@/api/error';
import ErrorComponent from '@/components/layout/ErrorComponent';

function computeErrorMessage(error: Error, t: TFunction): string {
  if (isPoguesAPIError(error)) {
    switch (error.response?.data.errorCode) {
      case ErrorCodes.QuestionnaireFormulaLanguageNotVTL:
        return t('articulation.overview.error.formulaNotVtl');
      case ErrorCodes.QuestionnaireRoundaboutNotFound:
        return t('articulation.overview.error.roundaboutNotFound');
    }
  }

  return error.message;
}

export default function ArticulationOverviewErrorComponent({
  error,
}: Readonly<{ error: Error }>) {
  const { t } = useTranslation();
  const errorMessage = computeErrorMessage(error, t);

  return <ErrorComponent error={errorMessage} />;
}
