import { useTranslation } from 'react-i18next';

import Label from '@/components/ui/form/Label';
import Select from '@/components/ui/form/Select';
import type { Stamp } from '@/models/stamps';

interface StampsSelectorProps {
  stamps?: Stamp[];
  selectedStamp?: string;
  onSelect: (stampId: string) => void;
}

/** Allow to select a stamp to fetch its questionnaires. */
export default function StampsSelector({
  stamps = [],
  selectedStamp,
  onSelect,
}: Readonly<StampsSelectorProps>) {
  const { t } = useTranslation();

  const options = stamps
    .toSorted((a, b) => a.label.localeCompare(b.label))
    .map((stamp) => ({ label: stamp.label, value: stamp.id }));

  return (
    <>
      <Label>{t('questionnaires.stamp')}</Label>
      <Select onChange={onSelect} options={options} value={selectedStamp} />
    </>
  );
}
