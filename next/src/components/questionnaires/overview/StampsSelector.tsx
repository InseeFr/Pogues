import { useTranslation } from 'react-i18next';

import Field from '@/components/ui/form/Field';
import Select from '@/components/ui/form/Select';
import type { Stamp } from '@/models/stamps';

interface StampsSelectorProps {
  stamps?: Stamp[];
  selectedStamp?: string;
  onSelect: (stampId: string | null) => void;
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
    <Field label={t('questionnaires.stamp')}>
      <Select onChange={onSelect} options={options} value={selectedStamp} />
    </Field>
  );
}
