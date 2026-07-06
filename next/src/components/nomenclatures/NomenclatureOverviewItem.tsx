import OverviewItem from '@/components/ui/OverviewItem'
import type { Nomenclature } from '@/models/nomenclature'

import NomenclatureOverviewItemContent from './NomenclatureOverviewItemContent'

interface NomenclatureOverviewItemProps {
  nomenclature: Nomenclature
}

/** Display nomenclature related info */
export default function NomenclatureOverviewItem({
  nomenclature,
}: Readonly<NomenclatureOverviewItemProps>) {
  return (
    <OverviewItem
      content={<NomenclatureOverviewItemContent nomenclature={nomenclature} />}
    />
  )
}
