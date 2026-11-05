import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { QuestionnaireDTO } from '@/api/models/questionnaireDTO'
import Tooltip from '@/components/ui/Tooltip'
import ChevronRightIcon from '@/components/ui/icons/ChevronRightIcon'

interface QuestionnaireProps {
  questionnaire: QuestionnaireDTO
}

/**
 * Display informations about a single questionnaire in a line of a table.
 *
 * @see {@link TableQuestionnaires}
 */
export default function QuestionnaireLine({
  questionnaire,
}: Readonly<QuestionnaireProps>) {
  const { t } = useTranslation()

  return (
    <Link
      className="table-row bg-default odd:bg-main *:p-4 cursor-pointer hover:bg-accent"
      to={'/questionnaire/$questionnaireId'}
      params={{ questionnaireId: questionnaire.id }}
    >
      <td>
        <div>{questionnaire.label}</div>
      </td>
      <td>
        <div>
          <Tooltip title={questionnaire.serie?.label}>
            {questionnaire.serie?.altLabel ? (
              questionnaire.serie.altLabel
            ) : questionnaire.serie?.label ? (
              t('questionnaires.notAvailable')
            ) : (
              <em>{t('questionnaires.toBeFilled')}</em>
            )}
          </Tooltip>
        </div>
      </td>
      <td>
        <div>
          {new Date(questionnaire.lastUpdatedDate).toLocaleDateString()}
        </div>
      </td>
      <td>
        <ChevronRightIcon />
      </td>
    </Link>
  )
}
