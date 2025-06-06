import { useTranslation } from 'react-i18next';

import Input from '@/components/ui/Input';
import RelatedQuestions from '@/components/ui/RelatedQuestions';
import { useFilters } from '@/hooks/useFilter';
import { FilterEnum } from '@/models/filter';
import { Nomenclature } from '@/models/nomenclature';

interface NomenclaturesProps {
  nomenclatures: Nomenclature[];
  questionnaireId: string;
}

/**
 * Display the nomenclatures of the selected questionnaire
 */
export default function NomenclaturesOverview({
  nomenclatures = [],
}: Readonly<NomenclaturesProps>) {
  const { t } = useTranslation();

  const { updateFilterContent, getFilterContent } = useFilters([
    {
      filterType: FilterEnum.Search,
      filterContent: '',
      clearFilterFunction: () => updateFilterContent(FilterEnum.Search, ''),
    },
  ]);
  const searchFilterContent = getFilterContent(FilterEnum.Search).toString();

  const filteredNomenclatures = nomenclatures
    .filter((n) =>
      n.label.toLowerCase().includes(searchFilterContent.toLowerCase()),
    )
    .toSorted((a, b) => a.label.localeCompare(b.label));

  return (
    <>
      <div>
        <Input
          label={t('nomenclatures.search')}
          placeholder={t('nomenclatures.search')}
          value={searchFilterContent}
          onChange={(e) =>
            updateFilterContent(FilterEnum.Search, e.target.value)
          }
          onClear={() => updateFilterContent(FilterEnum.Search, '')}
          showClearButton={searchFilterContent.length > 0}
        />
      </div>
      {filteredNomenclatures.length > 0 ? (
        <>
          {filteredNomenclatures.map((nomenclature) => (
            <div
              key={nomenclature.id}
              className="relative bg-default p-4 border border-default shadow-md grid grid-rows-[auto_1fr_auto]"
            >
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
            </div>
          ))}
        </>
      ) : (
        <div className="text-center">
          <p>{t('nomenclatures.noNomenclatures')}</p>
        </div>
      )}
    </>
  );
}
