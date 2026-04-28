import { useTranslation } from 'react-i18next'

import { useState } from 'react'

import ButtonLink, { ButtonStyle } from '@/components/ui/ButtonLink'
import Filters from '@/components/ui/Filters'
import { DatatypeType } from '@/models/datatype'
import { type Filter, FilterType } from '@/models/filters'
import { type Variable, VariableType } from '@/models/variables'

import VariablesScopeOverviewItem from './VariablesScopeOverviewItem'

interface Props {
  questionnaireId: string
  readonly?: boolean
  variables: Variable[]
}

/** Display the variables of the selected questionnaire. */
export default function VariablesOverview({
  questionnaireId,
  readonly = false,
  variables = [],
}: Readonly<Props>) {
  const { t } = useTranslation()
  const scopes = new Set<string>()

  const [filteredVariables, setFilteredVariables] =
    useState<Variable[]>(variables)

  const filters: Filter<Variable>[] = [
    {
      label: t('variable.name'),
      onFilter: (v: Variable, input?: string) =>
        input
          ? !!(
              v.name.toLowerCase().includes(input.toLowerCase()) ||
              v.description?.toLowerCase().includes(input.toLowerCase())
            )
          : true,
      placeholder: t('variables.search'),
      type: FilterType.Text,
    },
    {
      label: t('variables.datatype'),
      onFilter: (v: Variable, filter?: string) =>
        filter && filter !== 'all' ? filter === v.datatype.typeName : true,
      options: [
        { label: t('common.all'), value: 'all' },
        { label: t('variable.datatype.boolean'), value: DatatypeType.Boolean },
        { label: t('variable.datatype.date'), value: DatatypeType.Date },
        {
          label: t('variable.datatype.duration'),
          value: DatatypeType.Duration,
        },
        { label: t('variable.datatype.numeric'), value: DatatypeType.Numeric },
        { label: t('variable.datatype.text'), value: DatatypeType.Text },
      ],
      type: FilterType.Select,
    },
    {
      label: t('variables.type'),
      onFilter: (v: Variable, filter: string[] = []) =>
        filter.length > 0 ? filter.includes(v.type.toString()) : true,
      options: [
        {
          label: t('variable.type.collected'),
          value: VariableType.Collected.toString(),
        },
        {
          label: t('variable.type.calculated'),
          value: VariableType.Calculated.toString(),
        },
        {
          label: t('variable.type.external'),
          value: VariableType.External.toString(),
        },
      ],
      type: FilterType.ToggleGroup,
    },
  ]

  const sortedVariables = filteredVariables.toSorted((a, b) =>
    a.name.localeCompare(b.name),
  )
  variables.forEach((v) => {
    if (v.scope) scopes.add(v.scope)
  })

  if (variables.length > 0) {
    return (
      <>
        <Filters<Variable>
          filters={filters}
          data={variables}
          setFilteredData={setFilteredVariables}
        />
        <div>
          <VariablesScopeOverviewItem
            questionnaireId={questionnaireId}
            readonly={readonly}
            scope={t('common.questionnaire')}
            variables={sortedVariables.filter((n) => !n.scope)}
          />
          {Array.from(scopes).map((scope) => (
            <VariablesScopeOverviewItem
              key={scope}
              questionnaireId={questionnaireId}
              readonly={readonly}
              scope={scope}
              variables={sortedVariables.filter((n) => n.scope === scope)}
            />
          ))}
        </div>
      </>
    )
  }

  if (readonly) {
    return (
      <div>
        <p>{t('variables.questionnaireHasNoVariables')}</p>
      </div>
    )
  }

  return (
    <ButtonLink
      to="/questionnaire/$questionnaireId/variables/new"
      params={{ questionnaireId }}
      buttonStyle={ButtonStyle.Primary}
    >
      {t('variables.create')}
    </ButtonLink>
  )
}
