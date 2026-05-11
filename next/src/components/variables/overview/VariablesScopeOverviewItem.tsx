import OverviewItem from '@/components/ui/OverviewItem'
import type { Variable } from '@/models/variables'

import VariablesScopeOverviewItemContent from './VariablesScopeOverviewItemContent'
import VariablesScopeOverviewItemDetails from './VariablesScopeOverviewItemDetails'

interface Props {
  questionnaireId: string
  readonly?: boolean
  scope: string
  variables: Variable[]
}

/** Display variables related to a specific scope. */
export default function VariablesScopeOverviewItem({
  questionnaireId,
  readonly = false,
  scope,
  variables = [],
}: Readonly<Props>) {
  return (
    <OverviewItem
      content={
        <VariablesScopeOverviewItemContent
          scope={scope}
          variables={variables}
        />
      }
      details={
        <VariablesScopeOverviewItemDetails
          questionnaireId={questionnaireId}
          readonly={readonly}
          variables={variables}
        />
      }
      defaultExpanded
      disableExpandButton
    />
  )
}
