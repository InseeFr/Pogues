import { useTranslation } from 'react-i18next';

import { PersonalizationQuestionnaire } from '@/models/personalizationQuestionnaire';

interface PersonalisationTileProps {
  data: PersonalizationQuestionnaire;
  children: React.ReactNode;
}

/** Display the personalization windows as a wrapper */
export default function PersonalisationTile({
  data,
  children,
}: Readonly<PersonalisationTileProps>) {
  const { t } = useTranslation();

  return (
    <div className="relative bg-default p-4 border border-default shadow-md grid grid-rows-[auto_1fr_auto]">
      <div className="flex flex-col ">
        <h3>{data.label}</h3>
        <span className="text-sm text-gray-600 mt-1">
          {t('personalization.overview.modes')}
          {data.modes.map((mode) => mode.name).join(', ')}
        </span>
      </div>
      <div className="grid overflow-hidden grid-rows-[1fr] transition-all">
        {children}
      </div>
    </div>
  );
}
