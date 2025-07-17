import OverviewItem from '@/components/ui/OverviewItem';
import type { Variable } from '@/models/variables';

import VariablesScopeOverviewItemContent from './VariablesScopeOverviewItemContent';
import VariablesScopeOverviewItemDetails from './VariablesScopeOverviewItemDetails';

interface Props {
  scope: string;
  variables: Variable[];
}

export default function VariablesScopeOverviewItem({
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
      details={<VariablesScopeOverviewItemDetails variables={variables} />}
      defaultExpanded
      disableExpandButton
    />
  );
}
