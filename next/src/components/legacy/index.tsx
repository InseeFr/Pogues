import { Dispatch, SetStateAction, useMemo, useState } from 'react';

// @ts-expect-error import jsx component
import { Main } from '@pogues-legacy/App';
import { useBlocker } from '@tanstack/react-router';
import { TFunction } from 'i18next';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

import DirtyStateDialog from '@/components/layout/DirtyStateDialog';
import { DecodedIdTokenType, getAccessToken, useOidc } from '@/lib/auth/oidc';

export const LegacyComponent = () => {
  const { t } = useTranslation();
  const [isDirtyState, setIsDirtyState] = useState<boolean>(false);

  const { decodedIdToken } = useOidc();

  const { proceed, reset, status } = useBlocker({
    enableBeforeUnload: isDirtyState,
    shouldBlockFn: () => isDirtyState,
    withResolver: true,
  });

  const myComponent = useMemo(
    () => legacyApp(setIsDirtyState, decodedIdToken, t),
    [setIsDirtyState, decodedIdToken, t],
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
  decodedIdToken: DecodedIdTokenType,
  t: TFunction<'translation', undefined>,
) {
  return (
    <ErrorBoundary fallback={<div>{t('error.boundary')}</div>}>
      <Main
        setIsDirtyState={setIsDirtyState}
        getAccessToken={getAccessToken}
        decodedIdToken={decodedIdToken}
      />
    </ErrorBoundary>
  );
}
