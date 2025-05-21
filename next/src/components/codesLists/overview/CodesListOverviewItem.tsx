import { useState } from 'react';

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
import ExpandButton from '@/components/ui/ExpandButton';
import RelatedQuestions from '@/components/ui/RelatedQuestions';
import type { CodesList } from '@/models/codesLists';
import { uid } from '@/utils/utils';

import CodesTable from './CodesTable';

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

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const hasRelatedQuestion =
    codesList.relatedQuestionNames && codesList.relatedQuestionNames.length > 0;

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
        queryKey: ['codesLists', { questionnaireId }],
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
        queryKey: ['codesLists', { questionnaireId }],
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
        if (
          err.response?.data.errorCode === ERROR_CODES.RELATED_QUESTION_NAMES
        ) {
          const { relatedQuestionNames } = err.response
            .data as CodeListRelatedQuestionError;
          return t('codesList.overview.deleteError.usedByQuestions', {
            questions: relatedQuestionNames.join('\n'),
          });
        }
        return err.toString();
      },
    });
  }

  return (
    <div className="relative bg-default p-4 border border-default shadow-md grid grid-rows-[auto_1fr_auto]">
      <div className="grid grid-cols-[1fr_auto]">
        <h3>{codesList.label}</h3>
        <RelatedQuestions
          relatedQuestionNames={codesList.relatedQuestionNames}
        />
      </div>
      <div
        hidden={!isExpanded}
        className={`grid overflow-hidden grid-rows-[1fr] transition-all`}
        id={`codes-list-content-${codesList.id}`}
      >
        <div className="overflow-hidden space-y-3">
          <div className="pt-3">
            <CodesTable codesList={codesList} />
          </div>
          <div className="flex gap-x-2">
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
              buttonTitle={
                hasRelatedQuestion
                  ? t('codesList.overview.deleteDisabled.usedByQuestions')
                  : undefined
              }
              disabled={hasRelatedQuestion}
            />
          </div>
        </div>
      </div>
      <div className="text-center absolute bottom-0 left-1/2">
        <ExpandButton
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          ariaControls={`codes-list-content-${codesList.id}`}
        />
      </div>
    </div>
  );
}
