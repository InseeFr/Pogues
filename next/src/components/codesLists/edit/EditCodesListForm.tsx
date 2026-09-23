import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import toast from 'react-hot-toast'
import { Trans, useTranslation } from 'react-i18next'

import { useState } from 'react'

import { codesListsKeys, putCodesList } from '@/api/codesLists'
import Dialog from '@/components/ui/Dialog'
import { CodesList } from '@/models/codesLists'
import { FormulasLanguages } from '@/models/questionnaires'
import { Variable } from '@/models/variables'

import CodesListForm from '../form/CodesListForm'
import { FormValues } from '../form/schema'

interface EditCodesListFormProps {
  /** Initial codes list value. */
  codesList: CodesList
  /** Related questionnaire id. */
  questionnaireId: string
  formulasLanguage?: FormulasLanguages
  variables: Variable[]
}

/** Form to edit an existing code list. */
export default function EditCodesListForm({
  codesList,
  questionnaireId,
  formulasLanguage,
  variables,
}: Readonly<EditCodesListFormProps>) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [pendingValues, setPendingValues] = useState<FormValues | null>(null)

  const relatedQuestionNames = codesList.relatedQuestionNames ?? []
  const hasRelatedQuestions = relatedQuestionNames.length > 0

  const mutation = useMutation({
    mutationFn: ({
      codesList,
      questionnaireId,
    }: {
      codesList: CodesList
      questionnaireId: string
    }) => {
      return putCodesList(questionnaireId, codesList.id, codesList)
    },
    onSuccess: (_, { questionnaireId, codesList }) =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: codesListsKeys.all(questionnaireId),
        }),
        queryClient.invalidateQueries({
          queryKey: codesListsKeys.one(questionnaireId, codesList.id),
        }),
      ]),
  })

  const saveCodesList = async ({ label, codes }: FormValues) => {
    const updatedCodesList = { id: codesList.id, label, codes }
    const promise = mutation.mutateAsync(
      { questionnaireId, codesList: updatedCodesList },
      {
        onSuccess: () =>
          navigate({
            to: '/questionnaire/$questionnaireId/codes-lists',
            params: { questionnaireId },
          }),
      },
    )
    toast.promise(promise, {
      loading: t('common.loading'),
      success: t('codesList.edit.success', {
        label,
      }),
      error: (err: Error) => err.toString(),
    })
  }

  const onSubmit = (values: FormValues) => {
    if (hasRelatedQuestions) {
      setPendingValues(values)
      setDialogOpen(true)
    } else {
      saveCodesList(values)
    }
  }

  return (
    <>
      <CodesListForm
        codesList={codesList}
        questionnaireId={questionnaireId}
        formulasLanguage={formulasLanguage}
        variables={variables}
        onSubmit={onSubmit}
      />
      {hasRelatedQuestions ? (
        <Dialog
          title={t('codesList.form.dialog.resetVariableTitle')}
          body={
            <>
              <p>
                <Trans
                  i18nKey="codesList.form.dialog.resetVariableSubTitle"
                  components={{ bold: <strong /> }}
                />
              </p>
              <ul className="list-decimal list-inside my-1">
                {relatedQuestionNames.map((questionName) => (
                  <li key={questionName}>{questionName}</li>
                ))}
              </ul>
              <p>{t('codesList.form.dialog.resetVariableBody')}</p>
            </>
          }
          controlledOpen={dialogOpen}
          setControlledOpen={setDialogOpen}
          onCancel={() => setDialogOpen(false)}
          onValidate={() => {
            if (pendingValues) {
              saveCodesList(pendingValues)
            }
          }}
        />
      ) : null}
    </>
  )
}
