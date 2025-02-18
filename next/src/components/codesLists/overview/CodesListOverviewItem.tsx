import React from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { deleteCodesList } from '@/api/codesLists';
import ButtonLink from '@/components/ui/ButtonLink';
import Dialog from '@/components/ui/Dialog';
import type { Code, CodesList } from '@/models/codesLists';

interface CodesListProps {
  codesList: CodesList;
  questionnaireId: string;
}

/** Display a codes list and allow to edit it. */
export default function CodesListOverviewItem({
  codesList,
  questionnaireId,
}: Readonly<CodesListProps>) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      questionnaireId,
      codesListId,
    }: {
      questionnaireId: string;
      codesListId: string;
    }) => {
      return deleteCodesList(questionnaireId, codesListId);
    },
    onSuccess: (questionnaireId) =>
      queryClient.invalidateQueries({
        queryKey: ['questionnaire', { questionnaireId }],
      }),
  });

  function onDelete() {
    const promise = mutation.mutateAsync({
      questionnaireId,
      codesListId: codesList.id,
    });
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('codesList.overview.deleteSuccess', {
        label: codesList.label,
      }),
      error: (err: Error) => err.toString(),
    });
  }

  return (
    <div className="bg-default p-4 border border-default shadow-xl">
      <div className="space-y-3">
        <h2>{codesList.label}</h2>
        <table className="table-auto border border-default w-full shadow-sm">
          <thead className="bg-accent">
            <tr className="*:font-semibold *:p-4 text-left">
              <th>{t('codesList.common.value')}</th>
              <th>{t('codesList.common.label')}</th>
            </tr>
          </thead>
          <tbody className="text-default">
            {codesList.codes.map((code) => (
              <React.Fragment key={code.value}>
                <CodeLine code={code} />
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-x-2 mt-3">
        <ButtonLink
          to="/questionnaire/$questionnaireId/codes-list/$codesListId"
          params={{ questionnaireId, codesListId: codesList.id }}
        >
          {t('common.edit')}
        </ButtonLink>
        <Dialog
          label={t('common.delete')}
          title={t('codesList.overview.deleteDialogTitle', {
            label: codesList.label,
          })}
          body={t('codesList.overview.deleteDialogConfirm')}
          onValidate={onDelete}
        />
      </div>
    </div>
  );
}

interface CodeLineProps {
  code: Code;
  subCodeIteration?: number;
}

function CodeLine({ code, subCodeIteration = 0 }: Readonly<CodeLineProps>) {
  return (
    <>
      <tr className="bg-default odd:bg-main *:p-4">
        <td>
          <div style={{ marginLeft: `${subCodeIteration * 1.5}rem` }}>
            {code.value}
          </div>
        </td>
        <td>{code.label}</td>
      </tr>
      {code.codes?.map((code) => (
        <CodeLine
          code={code}
          key={code.value}
          subCodeIteration={subCodeIteration + 1}
        />
      ))}
    </>
  );
}
