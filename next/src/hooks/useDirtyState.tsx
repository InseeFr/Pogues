import { useEffect, useState } from 'react';

import { useBlocker } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import Dialog from '@/components/ui/Dialog';

export function useDirtyState() {
  const { t } = useTranslation();
  const [isDirtyState, setIsDirtyState] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const blocker = useBlocker({
    shouldBlockFn: () => isDirtyState,
    withResolver: true,
    enableBeforeUnload: isDirtyState,
  });

  useEffect(() => {
    if (blocker.status === 'blocked') {
      setIsDialogOpen(true);
    }
    // blocker.next needs to be dependency for displaying the dialog again if the user cancels and try again
  }, [blocker.status, blocker.next]);

  const handleValidate = () => {
    blocker.proceed?.();
    setIsDialogOpen(false);
    setIsDirtyState(false);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  const DirtyStateDialog = (
    <Dialog
      controlledOpen={isDialogOpen}
      setControlledOpen={setIsDialogOpen}
      title={t('common.unsavedModificationTitle')}
      body={t('common.unsavedModification')}
      onCancel={handleCancel}
      onValidate={handleValidate}
    />
  );

  return { isDirtyState, setIsDirtyState, DirtyStateDialog };
}
