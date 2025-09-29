import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { deleteMultimode, multimodeKeys } from '@/api/multimode';
import ButtonLink from '@/components/ui/ButtonLink';
import Card from '@/components/ui/Card';
import DialogButton from '@/components/ui/DialogButton';
import type { MultimodeIsMovedRules } from '@/models/multimode';

interface Props {
  questionnaireId: string;
  isMovedRules?: MultimodeIsMovedRules;
  /** Whether we display the multimode as readonly (i.e. back-up version). */
  readonly?: boolean;
}

/**
 * Display the multimode of the selected questionnaire and allow to create or
 * edit it.
 *
 * For now we only handle the "IS_MOVED" rule, although the back-end
 * implementation is more generic and may allow new type of rules if needed.
 */
export default function MultimodeOverview({
  questionnaireId,
  isMovedRules = {},
  readonly = false,
}: Readonly<Props>) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const hasRules =
    isMovedRules.leafFormula || isMovedRules.questionnaireFormula;

  const deleteMutation = useMutation({
    mutationFn: ({ questionnaireId }: { questionnaireId: string }) => {
      return deleteMultimode(questionnaireId);
    },
    onSuccess: (_, { questionnaireId }) =>
      queryClient.invalidateQueries({
        queryKey: multimodeKeys.all(questionnaireId),
      }),
  });

  function onDelete() {
    const promise = deleteMutation.mutateAsync({
      questionnaireId,
    });
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('multimode.delete.success'),
      error: (err: Error) => err.toString(),
    });
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-gray-600">
        <p>{t('multimode.description')}</p>
        <p>{t('multimode.howToUse')}</p>
      </div>

      {hasRules ? (
        <Card className="space-y-3">
          {isMovedRules.questionnaireFormula ? (
            <div className="w-full">
              <div>{t('multimode.questionnaireRule')}</div>
              <div className="p-2 w-full">
                <code className="inline-block whitespace-pre line px-2 py-1 text-primary bg-gray-50 border w-full">
                  {isMovedRules.questionnaireFormula}
                </code>
              </div>
            </div>
          ) : (
            <div>{t('multimode.noQuestionnaireRule')}</div>
          )}
          {isMovedRules.leafFormula ? (
            <div>
              <div>{t('multimode.leafRule')}</div>
              <div className="p-2 w-full">
                <code className="inline-block whitespace-pre line px-2 py-1 text-primary bg-gray-50 border w-full">
                  {isMovedRules.leafFormula}
                </code>
              </div>
            </div>
          ) : (
            <div>{t('multimode.noLeafRule')}</div>
          )}
          {readonly ? null : (
            <div className="flex gap-x-2">
              <ButtonLink
                to="/questionnaire/$questionnaireId/multimode/edit"
                params={{ questionnaireId }}
              >
                {t('common.edit')}
              </ButtonLink>
              <DialogButton
                label={t('common.delete')}
                title={t('multimode.delete.dialogTitle')}
                body={t('multimode.delete.dialogConfirm')}
                onValidate={onDelete}
              />
            </div>
          )}
        </Card>
      ) : readonly ? (
        <div>{t('multimode.versionNoMultimode')}</div>
      ) : (
        <ButtonLink
          to="/questionnaire/$questionnaireId/multimode/edit"
          params={{ questionnaireId }}
        >
          + {t('multimode.new')}
        </ButtonLink>
      )}
    </div>
  );
}
