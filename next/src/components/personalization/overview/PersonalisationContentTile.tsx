import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import ExpandButton from '@/components/ui/ExpandButton';
import { PersonalizationQuestionnaire } from '@/models/personalizationQuestionnaire';

interface PersonalizationContentTileProps {
  data: PersonalizationQuestionnaire;
  children: React.ReactNode;
}

/** Display the personalization windows as a wrapper */
export default function PersonalizationContentTile({
  data,
  children,
}: Readonly<PersonalizationContentTileProps>) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="relative bg-default p-4 border border-default shadow-md grid grid-rows-[auto_1fr_auto] my-2">
      <div className="grid grid-cols-[1fr_auto]">
        <h3>{t('personalization.overview.currentSurveyUnits')}</h3>
      </div>
      <div
        hidden={!isExpanded}
        className={`grid overflow-hidden grid-rows-[1fr] transition-all`}
        id={`personalization-list-content-${data.id}`}
      >
        <div className="overflow-hidden space-y-3">{children}</div>
      </div>
      <div className="text-center">
        <ExpandButton
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          ariaControls={`personalization-content-${data.id}`}
        />
      </div>
    </div>
  );
}
