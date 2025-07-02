import { useTranslation } from 'react-i18next';

import FilterList from '@/components/ui/FilterList';
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

  const { filters, updateFilterContent, getFilterContent } = useFilters([
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

  return nomenclatures.length > 0 ? (
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
      <FilterList
        filters={filters}
        resultCount={filteredNomenclatures.length}
        updateFilterContent={updateFilterContent}
      />
      <ul>
        {filteredNomenclatures.map((nomenclature) => (
          <NomenclatureOverviewItem
            key={nomenclature.id}
            nomenclature={nomenclature}
          />
        ))}
      </ul>
    </>
  ) : (
    <div>
      <p>{t('nomenclatures.notUsedByQuestionnaire')}</p>
    </div>
  );
}
