import RelatedQuestions from '@/components/ui/RelatedQuestions';
import type { CodesList } from '@/models/codesLists';

interface CodesListOverviewItemContentProps {
  codesList: CodesList;
}

/** Display main information about a code list (name and related questions). */
export default function CodesListOverviewItemContent({
  codesList,
}: Readonly<CodesListOverviewItemContentProps>) {
  return (
    <div className="grid grid-cols-[1fr_auto]">
      <h3>{codesList.label}</h3>
      <RelatedQuestions relatedQuestionNames={codesList.relatedQuestionNames} />
    </div>
  );
}
