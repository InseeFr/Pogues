import { useEffect, useState } from 'react';

import { useBlocker } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import Dialog from '@/components/ui/Dialog';
import { useDirtyState } from '@/contexts/DirtyStateContext';

export function DirtyStateDialog() {
  const { t } = useTranslation();
  const { isDirty, setDirty } = useDirtyState();
  const [dialogOpen, setDialogOpen] = useState(false);

  const blocker = useBlocker({
    shouldBlockFn: () => isDirty,
    withResolver: true,
    enableBeforeUnload: isDirty,
  });

  useEffect(() => {
    if (blocker.status === 'blocked') {
      setDialogOpen(true);
    }
  }, [blocker.next, blocker.status]);

  const handleValidate = () => {
    blocker.proceed?.();
    setDialogOpen(false);
    setDirty(false);
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog
      controlledOpen={dialogOpen}
      setControlledOpen={setDialogOpen}
      title={t('common.unsavedModificationTitle')}
      body={t('common.unsavedModification')}
      onCancel={handleCancel}
      onValidate={handleValidate}
    />
  );
}
