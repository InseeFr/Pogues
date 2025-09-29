// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { useMemo } from 'react';

//@ts-expect-error import jsx component
import { Main } from '@pogues-legacy/App';
import { TFunction } from 'i18next';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

import { useDirtyState } from '@/contexts/DirtyStateContext';

export const LegacyComponent = () => {
  const { t } = useTranslation();
  const { setDirty } = useDirtyState();

  const myComponent = useMemo(() => legacyApp(setDirty, t), [setDirty, t]);

  return myComponent;
};

function legacyApp(
  setIsDirtyState: (isDirtyState: boolean) => void,
  t: TFunction<'translation', undefined>,
) {
  return (
    <ErrorBoundary fallback={<div>{t('error.boundary')}</div>}>
      <Main setIsDirtyState={setIsDirtyState} />
    </ErrorBoundary>
  );
}
