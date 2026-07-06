import { useTranslation } from 'react-i18next'

import RelatedQuestions from '@/components/ui/RelatedQuestions'
import { Nomenclature } from '@/models/nomenclature'

interface NomenclatureOverviewItemContentProps {
  nomenclature: Nomenclature
}

/** Display main information about a nomenclature (name and related questions). */
export default function NomenclatureOverviewItemContent({
  nomenclature,
}: Readonly<NomenclatureOverviewItemContentProps>) {
  const { t } = useTranslation()

  const themeValue = nomenclature.theme ?? (
    <i>{t('nomenclatures.table.noValue')}</i>
  )

  const referenceYearValue = nomenclature.referenceYear ?? (
    <i>{t('nomenclatures.table.noValue')}</i>
  )

  const versionValue = nomenclature.version ?? (
    <i>{t('nomenclatures.table.noValue')}</i>
  )

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <h3>{nomenclature.label}</h3>
        <li>
          <ul className="text-sm text-gray-600">
            {t('nomenclatures.table.theme')}: {themeValue}
          </ul>
          <ul className="text-sm text-gray-600">
            {t('nomenclatures.table.referenceYear')}: {referenceYearValue}
          </ul>
          <ul className="text-sm text-gray-600">
            {t('nomenclatures.table.version')}: {versionValue}
          </ul>
        </li>
      </div>
      <RelatedQuestions
        relatedQuestionNames={nomenclature.relatedQuestionNames}
      />
    </div>
  )
}
