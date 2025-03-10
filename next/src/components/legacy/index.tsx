// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { Main } from '@pogues-legacy/App';
import { useBlocker } from '@tanstack/react-router';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

import { useDirtyState } from '@/hooks/useDirtyState';

export const LegacyComponent = () => {
  const { t } = useTranslation();
  const { isDirtyState, setIsDirtyState } = useDirtyState();

  // Block navigation if we are in dirty state
  useBlocker({
    shouldBlockFn: () => {
      if (!isDirtyState) return false;

      // Display confirm modal if we are in dirty state
      const shouldLeave = confirm(t('common.unsavedModification'));

      // If user cancels we block navigation, otherwise we allow it
      return !shouldLeave;
    },
  });

  return (
    <ErrorBoundary fallback={<div>{t('error.boundary')}</div>}>
      <Main setIsDirtyState={setIsDirtyState} />
    </ErrorBoundary>
  );
};
