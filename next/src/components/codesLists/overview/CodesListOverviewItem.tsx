import OverviewItem from '@/components/ui/OverviewItem';
import type { CodesList } from '@/models/codesLists';

import CodesListOverviewItemContent from './CodesListOverviewItemContent';
import CodesListOverviewItemDetails from './CodesListOverviewItemDetails';

interface CodesListProps {
  codesList: CodesList;
  questionnaireId: string;
  readonly?: boolean;
}

/** Display a codes list and allow to edit it. */
export default function CodesListOverviewItem({
  codesList,
  questionnaireId,
  readonly = false,
}: Readonly<CodesListProps>) {
  return (
    <OverviewItem
      content={<CodesListOverviewItemContent codesList={codesList} />}
      details={
        <CodesListOverviewItemDetails
          codesList={codesList}
          questionnaireId={questionnaireId}
          readonly={readonly}
        />
      }
    />
  );
}
