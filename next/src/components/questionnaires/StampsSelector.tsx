import Label from '@/components/ui/Label';
import Option from '@/components/ui/Option';
import Select from '@/components/ui/Select';
import type { Stamp } from '@/models/stamps';

import { useTranslation } from '../../i18n';

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
  const { t } = useTranslation('questionnairesMessage');
  return (
    <>
      <Label>{t('stamp')}</Label>
      <Select onChange={(v) => onSelect(v as string)} value={selectedStamp}>
        {stamps
          .toSorted((a, b) => a.label.localeCompare(b.label))
          .map((stamp) => (
            <Option key={stamp.id} value={stamp.id}>
              {stamp.label}
            </Option>
          ))}
      </Select>
    </>
  );
}
