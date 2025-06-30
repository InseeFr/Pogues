import OverviewItem from '@/components/ui/OverviewItem';
import type { CodesList } from '@/models/codesLists';

import CodesListOverviewItemContent from './CodesListOverviewItemContent';
import CodesListOverviewItemDetails from './CodesListOverviewItemDetails';

interface CodesListProps {
  codesList: CodesList;
  questionnaireId: string;
}

/** Display a codes list and allow to edit it. */
export default function CodesListOverviewItem({
  codesList,
  questionnaireId,
}: Readonly<CodesListProps>) {
  return (
    <OverviewItem
      content={<CodesListOverviewItemContent codesList={codesList} />}
      details={
        <CodesListOverviewItemDetails
          codesList={codesList}
          questionnaireId={questionnaireId}
        />
      }
    />
  );
}
