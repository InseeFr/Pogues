import OverviewItem from '@/components/ui/OverviewItem';
import type { Nomenclature } from '@/models/nomenclature';

import RelatedQuestions from '../ui/RelatedQuestions';

interface NomenclatureOverviewItemProps {
  nomenclature: Nomenclature;
}

/** Display a codes list and allow to edit it. */
export default function NomenclatureOverviewItem({
  nomenclature,
}: Readonly<NomenclatureOverviewItemProps>) {
  return (
    <OverviewItem
      content={
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h3>{nomenclature.label}</h3>
            <span className="text-sm text-gray-600">
              {nomenclature.version}
            </span>
          </div>
          <RelatedQuestions
            relatedQuestionNames={nomenclature.relatedQuestionNames}
          />
        </div>
      }
    />
  );
}
