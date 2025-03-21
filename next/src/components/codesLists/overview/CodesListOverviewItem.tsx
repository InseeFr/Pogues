import React from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import {
  CodeListError,
  CodeListRelatedQuestionError,
  ERROR_CODES,
  deleteCodesList,
  putCodesList,
} from '@/api/codesLists';
import ButtonLink from '@/components/ui/ButtonLink';
import Dialog from '@/components/ui/Dialog';
import type { Code, CodesList } from '@/models/codesLists';
import { uid } from '@/utils/utils';

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

  const duplicateMutation = useMutation({
    mutationFn: ({
      questionnaireId,
      codesListId,
      codesList,
    }: {
      questionnaireId: string;
      codesListId: string;
      codesList: CodesList;
    }) => {
      return putCodesList(questionnaireId, codesListId, codesList);
    },
    onSuccess: (_, { questionnaireId }) =>
      queryClient.invalidateQueries({
        queryKey: ['questionnaire', { questionnaireId }],
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: ({
      questionnaireId,
      codesListId,
    }: {
      questionnaireId: string;
      codesListId: string;
    }) => {
      return deleteCodesList(questionnaireId, codesListId);
    },
    onSuccess: (_, { questionnaireId }) =>
      queryClient.invalidateQueries({
        queryKey: ['questionnaire', { questionnaireId }],
      }),
  });

  function onDuplicate() {
    const id = uid();
    const newCodesList = {
      ...codesList,
      id,
      label: `${codesList.label} (copie)`,
    };

    const promise = duplicateMutation.mutateAsync({
      questionnaireId,
      codesListId: id,
      codesList: newCodesList,
    });
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('codesList.overview.duplicateSuccess', {
        label: codesList.label,
      }),
      error: (err: Error) => err.toString(),
    });
  }

  function onDelete() {
    const promise = deleteMutation.mutateAsync({
      questionnaireId,
      codesListId: codesList.id,
    });
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('codesList.overview.deleteSuccess', {
        label: codesList.label,
      }),
      error: (err: AxiosError<CodeListError>) => {
        console.log(err);
        if (
          err.response?.data.errorCode === ERROR_CODES.RELATED_QUESTION_NAMES
        ) {
          const { relatedQuestionNames } = err.response
            .data as CodeListRelatedQuestionError;
          return t('codesList.overview.deleteError.usedInQuestions', {
            questions: relatedQuestionNames.join('\n'),
          });
        }
        return err.toString();
      },
    });
  }

  return (
    <div className="bg-default p-4 border border-default shadow-xl">
      <div className="space-y-3">
        <h2>{codesList.label}</h2>
        <table className="table-auto border border-default w-full shadow-sm">
          <thead className="bg-accent">
            <tr className="*:font-semibold *:p-4 text-left">
              <th>{t('codesList.common.codeValue')}</th>
              <th>{t('codesList.common.codeLabel')}</th>
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
          label={t('codesList.overview.duplicate')}
          title={t('codesList.overview.duplicateDialogTitle', {
            label: codesList.label,
          })}
          body={t('codesList.overview.duplicateDialogConfirm')}
          onValidate={onDuplicate}
        />
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
