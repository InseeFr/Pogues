import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import Filters from '@/components/ui/Filters';
import { Filter, FilterType } from '@/models/filters';
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

  const [filteredNomenclatures, setFilteredNomenclatures] =
    useState<Nomenclature[]>(nomenclatures);

  const filters: Filter<Nomenclature>[] = [
    {
      label: t('nomenclatures.name'),
      onFilter: (v: Nomenclature, input?: string) =>
        input ? v.label.toLowerCase().includes(input.toLowerCase()) : true,
      placeholder: t('nomenclatures.search'),
      type: FilterType.Text,
    },
  ];

  return nomenclatures.length > 0 ? (
    <>
      <Filters<Nomenclature>
        filters={filters}
        data={nomenclatures}
        setFilteredData={setFilteredNomenclatures}
      />
      <ul>
        {filteredNomenclatures
          .toSorted((a, b) => a.label.localeCompare(b.label))
          .map((nomenclature) => (
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
