import { useTranslation } from 'react-i18next'

import type { Variable } from '@/models/variables'

import VariableLine from './VariableLine'

interface Props {
  questionnaireId: string
  readonly?: boolean
  variables: Variable[]
}

/** Display variables as a table. */
export default function VariablesTable({
  questionnaireId,
  readonly = false,
  variables,
}: Readonly<Props>) {
  const { t } = useTranslation()

  return (
    <table className="border border-default w-full shadow-sm">
      <caption className="sr-only">{t('variables.title')}</caption>
      <thead className="bg-accent">
        <tr className="*:font-semibold *:p-4 text-left">
          <th scope="col" className="w-1/6">
            {t('variable.name')}
          </th>
          <th scope="col" className="w-3/6">
            {t('variable.description')}
          </th>
          <th scope="col" className="w-1/6">
            {t('variable.datatype.label')}
          </th>
          <th scope="col" className="w-1/6">
            {t('variable.type.label')}
          </th>
          <th />
        </tr>
      </thead>
      <tbody className="text-default">
        {variables.map((variable) => (
          <VariableLine
            key={variable.id}
            questionnaireId={questionnaireId}
            readonly={readonly}
            variable={variable}
          />
        ))}
      </tbody>
    </table>
  )
}
