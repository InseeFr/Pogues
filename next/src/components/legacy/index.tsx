// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { Main } from '@pogues-legacy/App';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

export const LegacyComponent = () => {
  const { t } = useTranslation();
  return (
    <ErrorBoundary fallback={<div>{t('error.boundary')}</div>}>
      <Main />
    </ErrorBoundary>
  );
};
