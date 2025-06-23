import { useTranslation } from 'react-i18next';

import Input from '@/components/ui/form/Input';
import { useFilters } from '@/hooks/useFilter';
import { FilterEnum } from '@/models/filter';
import { Nomenclature } from '@/models/nomenclature';

import NomenclatureOverviewItem from './NomenclatureOverviewItem';

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
        <ul>
          {filteredNomenclatures.map((nomenclature) => (
            <NomenclatureOverviewItem
              key={nomenclature.id}
              nomenclature={nomenclature}
            />
          ))}
        </ul>
      ) : (
        <div className="text-center">
          <p>{t('nomenclatures.noNomenclatures')}</p>
        </div>
      )}
    </>
  );
}
