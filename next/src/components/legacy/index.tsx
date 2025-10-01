import { Dispatch, SetStateAction, useMemo, useState } from 'react';

// @ts-expect-error import jsx component
import { Main } from '@pogues-legacy/App';
import { useBlocker } from '@tanstack/react-router';
import { TFunction } from 'i18next';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

import DirtyStateDialog from '@/components/layout/DirtyStateDialog';

export const LegacyComponent = () => {
  const { t } = useTranslation();
  const [isDirtyState, setIsDirtyState] = useState<boolean>(false);

  const { proceed, reset, status } = useBlocker({
    enableBeforeUnload: isDirtyState,
    shouldBlockFn: () => isDirtyState,
    withResolver: true,
  });

  const myComponent = useMemo(
    () => legacyApp(setIsDirtyState, t),
    [setIsDirtyState, t],
  );

  return (
    <>
      {myComponent}

      {status === 'blocked' && (
        <DirtyStateDialog
          onValidate={() => {
            proceed?.();
            setIsDirtyState(false);
          }}
          onCancel={() => {
            reset?.();
          }}
        />
      )}
    </>
  );
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
