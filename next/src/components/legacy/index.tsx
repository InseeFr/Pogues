// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { Dispatch, SetStateAction, useMemo, useState } from 'react';

//@ts-expect-error import jsx component
import { Main } from '@pogues-legacy/App';
import { useBlocker } from '@tanstack/react-router';
import { TFunction } from 'i18next';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

export const LegacyComponent = () => {
  const { t } = useTranslation();
  const [isDirtyState, setIsDirtyState] = useState<boolean>(false);

  // Block navigation if we are in dirty state
  useBlocker({
    // enable blocker only if we are in dirty state
    enableBeforeUnload: isDirtyState,
    shouldBlockFn: () => {
      if (!isDirtyState) return false;

      // Display confirm modal if we are in dirty state
      const shouldLeave = confirm(t('common.unsavedModification'));

      // The user confirms, so we pursue navigation and reset dirty state
      if (shouldLeave) {
        setIsDirtyState(false);
        return false;
      }

      // The user cancels, we only block navigation
      return true;
    },
  });

  const myComponent = useMemo(
    () => legacyApp(setIsDirtyState, t),
    [setIsDirtyState, t],
  );

  return myComponent;
};

function legacyApp(
  setIsDirtyState: Dispatch<SetStateAction<boolean>>,
  t: TFunction<'translation', undefined>,
) {
  return (
    <ErrorBoundary fallback={<div>{t('error.boundary')}</div>}>
      <Main setIsDirtyState={setIsDirtyState} />
    </ErrorBoundary>
  );
}
