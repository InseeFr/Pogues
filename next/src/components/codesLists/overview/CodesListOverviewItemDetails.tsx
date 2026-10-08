import { isAxiosError } from 'axios'
import { useTranslation } from 'react-i18next'

import {
  CodeListError,
  CodeListRelatedQuestionError,
  ERROR_CODES,
  codesListsKeys,
  deleteCodesList,
  putCodesList,
} from '@/api/codesLists'
import ButtonLink from '@/components/ui/ButtonLink'
import DeleteButton from '@/components/ui/DeleteButton'
import DuplicateButton from '@/components/ui/DuplicateButton'
import { useDeleteMutation } from '@/hooks/form/useDeleteMutation'
import { useMutationWithToast } from '@/hooks/form/useMutationWithToast'
import type { CodesList } from '@/models/codesLists'
import { uid } from '@/utils/utils'

import CodesTable from './CodesTable'

interface CodesListOverviewItemDetailsProps {
  codesList: CodesList
  questionnaireId: string
  readonly?: boolean
}

/** Display code list data and allow to edit, duplicate or delete it. */
export default function CodesListOverviewItemDetails({
  codesList,
  questionnaireId,
  readonly = false,
}: Readonly<CodesListOverviewItemDetailsProps>) {
  const { t } = useTranslation()

  const hasRelatedQuestion =
    codesList.relatedQuestionNames && codesList.relatedQuestionNames.length > 0

  const { submit: duplicate } = useMutationWithToast({
    mutationFn: ({
      questionnaireId,
      codesList,
    }: {
      questionnaireId: string
      codesList: CodesList
    }) => putCodesList(questionnaireId, codesList.id, codesList),
    invalidateKeys: [codesListsKeys.all(questionnaireId)],
    successMessage: t('codesList.duplicate.success', {
      label: codesList.label,
    }),
  })

  const { remove } = useDeleteMutation({
    mutationFn: ({
      questionnaireId,
      codesListId,
    }: {
      questionnaireId: string
      codesListId: string
    }) => deleteCodesList(questionnaireId, codesListId),
    invalidateKeys: [codesListsKeys.all(questionnaireId)],
    successMessage: t('codesList.delete.success', { label: codesList.label }),
    errorMessage: (error) => {
      if (
        isAxiosError<CodeListError>(error) &&
        error.response?.data.errorCode === ERROR_CODES.RELATED_QUESTION_NAMES
      ) {
        const { relatedQuestionNames } = error.response
          .data as CodeListRelatedQuestionError
        return t('codesList.delete.error.usedByQuestions', {
          questions: relatedQuestionNames.join('\n'),
        })
      }
      return error.toString()
    },
  })

  function onDuplicate() {
    const id = uid()
    const newCodesList = {
      ...codesList,
      id,
      label: `${codesList.label} (copie)`,
    }

    return duplicate({ questionnaireId, codesList: newCodesList })
  }

  function onDelete() {
    return remove({ questionnaireId, codesListId: codesList.id })
  }

  return (
    <div className="overflow-hidden space-y-3">
      <div className="pt-3">
        <CodesTable codesList={codesList} />
      </div>
      {!readonly ? (
        <div className="flex gap-x-2">
          <ButtonLink
            to="/questionnaire/$questionnaireId/codes-list/$codesListId"
            params={{ questionnaireId, codesListId: codesList.id }}
          >
            {t('common.edit')}
          </ButtonLink>
          <DuplicateButton
            title={t('codesList.duplicate.dialogTitle', {
              label: codesList.label,
            })}
            body={t('codesList.duplicate.dialogConfirm')}
            onConfirm={onDuplicate}
          />
          <DeleteButton
            title={t('codesList.delete.dialogTitle', {
              label: codesList.label,
            })}
            body={t('codesList.delete.dialogConfirm')}
            onConfirm={onDelete}
            buttonTitle={
              hasRelatedQuestion
                ? t('codesList.delete.disabled.usedByQuestions')
                : undefined
            }
            disabled={hasRelatedQuestion}
          />
        </div>
      ) : null}
    </div>
  )
}
